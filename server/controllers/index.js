const { comparePassword } = require('../helpers/bcrypt');
const { sign } = require('../helpers/jwtHelper');
const { User, Attendance, Department } = require('../models')


class Controller{
  static register(req, res, next){
    const{ fullName, email, password, address, placeOfBirth, dateOfBirth, occupation, phoneNumber, batch, departmentId } = req.body
    User.create({
      fullName, email, password, address, placeOfBirth, dateOfBirth, occupation, phoneNumber, batch, departmentId
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

      const accesstoken = sign({ id : user.id, email : user.email })
      res.status(200).json({ accesstoken, email : user.dataValues.email})
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
    const { attendanceType, remarks, email } = req.body
    const attendanceDate = new Date()
    try {
      const { id } = await User.findOne({ where : { email }})
      if(id) {
        const dataAbsen = await Attendance.create({ attendanceType, attendanceDate, remarks, userId : id})
        res.status(201).json(dataAbsen)
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = Controller