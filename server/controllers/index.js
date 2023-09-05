const { comparePassword } = require('../helpers/bcrypt');
const { sign } = require('../helpers/jwtHelper');
const { User, Attendance, Department, Class, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
var moment = require('moment-timezone');
var path = require('path');


class Controller{
  static register(req, res, next){
    const{ fullName, email, password, address, placeOfBirth, dateOfBirth, role, occupation, phoneNumber, batch, departmentId } = req.body
    User.create({
      fullName, email, password, address, placeOfBirth, dateOfBirth, role, occupation, phoneNumber, batch, departmentId
    })
    .then((data) => {
      res.status(201).json({ id : data.id, email : data.email})
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })
  }

  static login(req, res, next){
    const { email, password } = req.body
    User.findOne({ where : { email }})
    .then((user) => {
      if(!email || !password) throw { name : 'BadRequest'}
      if(!user) throw { name : "Unauthorized" }
      const compareResult = comparePassword(password, user.password)
      if(!compareResult) throw { name : "Unauthorized" }
      if(user.isLogin == 'Y') throw { name : "isLogin"}
      return User.update({
        isLogin : 'Y'
      }, {
        where : { email :  user.email }, returning : true
      })
      .then((data) => {
        console.log(data,"<<<<iniData");
        const userLogin = data[1][0]
        const accesstoken = sign({ id : userLogin.id, email : userLogin.email })
        res.status(200).json({ accesstoken, email : userLogin.dataValues.email, role: userLogin.dataValues.role})
      })
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })
  }

  static logout(req, res, next){
    const { isLogin, email } = req.body
    User.update({
      isLogin
    }, {
      where : { email }, returning : true
    })
      .then((data) => {
        res.status(200).json({ message : 'Success Logout'})
      })
      .catch((err) => {
        console.log(err);
        next(err)
      })
  }

  static getDeparments(req, res, next){
    Department.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((error) => {
        console.log(error);
        next(error)
      })
  }

  static async postAbsen(req, res, next){
    const { email, attendanceType, remarks, classId } = req.body
    const attendanceDate = new Date()
    try {
      const { id } = await User.findOne({ where : { email }})
      if(id) {
        const dataAbsen = await Attendance.create({ attendanceType, attendanceDate, remarks, userId : id, classId})
        res.status(201).json(dataAbsen)
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async createClass(req, res, next){
    const {className, pembicara, date, classType, time, flyer, status, classCode } = req.body
    var dateFormatted = new Date(date).toLocaleDateString(["ban","id"])
    console.log(dateFormatted,'<<<date');
    try {
      const newClass = Class.create({
        className, pembicara, date, classType, time, flyer, status, classCode
      })
      res.status(201).json(newClass)
    } catch (error) {
        console.log(error);
        next(error)
    }
  }

  static async getClasses (req, res, next) {
    try {
      const classes = await Class.findAll()
      res.status(200).json(classes)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async deleteClass (req, res, next) {
    let roleUser = req.user.role
    if( roleUser !== 'Admin') throw { name : 'Forbidden' }
    try {
      const classDeleted = await Class.findByPk(req.params.id)
      if(!classDeleted) throw { name : 'Not Found'}
      const runDelete = await Class.destroy({ where: { id: req.params.id } } )
      res.status(200).json({ message : `${classDeleted.dataValues.className} success deleted`})
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async getClassEdit (req, res, next) {
    let roleUser = req.user.role
    // if( roleUser !== 'Admin') throw { name : 'Forbidden' }
    try {
      const classEdit = await Class.findByPk(req.params.id)
      if(!classEdit) throw { name : 'Not Found'}
      res.status(200).json(classEdit)
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editClassSave (req, res, next) {
    console.log(req.body, '<<<req.body');
    const {className, pembicara, date, classType, time, classCode, flyer } = req.body
    let roleUser = req.user.role
    if( roleUser !== 'Admin') throw { name : 'Forbidden' }
    try {
      const classEditsave = await Class.update(
        {className, pembicara, date, classType, time, classCode, flyer},
        { where: { id : req.params.id }, returning : true}
      )
      let updateData = classEditsave[1][0]
      res.status(200).json({message : `${updateData.className} has been edited`})
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async activeClass (req, res, next) {
    let roleUser = req.user.role
    if( roleUser !== 'Admin') throw { name : 'Forbidden' }
    try {
      const activeClass = await Class.update(
        {status : 'active'},
        {where: { id : req.params.id }, returning : true}
      )
      let updateData = activeClass[1][0]
      res.status(200).json({message : `${updateData.className} has been edited`})
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async finishClass (req, res, next) {
    let roleUser = req.user.role
    if( roleUser !== 'Admin') throw { name : 'Forbidden' }
    try {
      const activeClass = await Class.update(
        {status : 'finish'},
        {where: { id : req.params.id }, returning : true}
      )
      let updateData = activeClass[1][0]
      res.status(200).json({message : `${updateData.className} has been mark as finished`})
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async customeQuery (req, res, next) {
    let roleUser = req.user.role;
    let userEmail = req.user.email;
    try {
      console.log(roleUser,'<<<');
      const classes = await sequelize.query(`Select a."email", b."attendanceType", b."attendanceDate", b."remarks", c."className", c."flyer", c."pembicara", c."status", c."date", c."time" from "Users" a JOIN "Attendances" b on a."id"=b."userId" RIGHT JOIN "Classes" c on c."id"=b."classId" WHERE a."email"='${userEmail}' or a."email" is NULL`, { type: QueryTypes.SELECT});
      console.log(classes,'<<<classes');
      res.status(200).json(classes)
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller