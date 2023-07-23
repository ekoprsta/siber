const { comparePassword } = require('../helpers/bcrypt');
const { sign } = require('../helpers/jwtHelper');
const { User, Attendance, Department, Class } = require('../models')
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
    console.log('<<>>>');
    // const dir = path.join(__dirname, '../client/uploads/');
    // var multer = require('multer'),
    // fs = require('fs');
    // const DIR = './Public/';
    // const storage = multer.diskStorage({
    //   destination: function (req, file, cb) {
    //     cb(null, dir);
    //     // const dir = path.join(__dirname, '../client/uploads/'+file.originalname);
    //     // console.log(dir,'<<dir');
    //     // try {
    //     //   fs.existsSync(dir, exist => {
    //     //     if (!exist) {
    //     //       return fs.mkdirSync(dir, error => cb(error, dir));
    //     //     } else {
    //     //       return cb(null, dir);
    //     //     }
    //     //   })
    //     // } catch (error) {
    //     //   console.log(moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss') + ' : ' + 'ex create folder', error);
    //     // }
    //   },
    //   filename: function (req, file, cb) {
    //     const fileName = file.originalname.toLowerCase().split(' ').join('-');
    //     cb(null, fileName)
    //   }
    // });
    // const upload = multer({ storage: storage }).single('picture');
    // upload(req, res, err => {
    //   if (err) throw err
    //   // flyer = req.files.name
    //   const {className, pembicara, date, classType, time, flyer } = req.body
    //   console.log(className,'<<<<clasName');
    //   // try {
    //   //   const newClass = Class.create({
    //   //     className, pembicara, date, classType, time, flyer
    //   //   })
    //   //   // res.status(201).json(newClass)
    //   // } catch (error) {
    //   //   console.log(error);
    //   //   next(error)
    //   // }
    //   console.log('uploaded');
    // })
    res.send('data has been uploaded');
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
}

module.exports = Controller