const Controller = require('../controllers')
const errorHandler = require('../middleware/errorHandlingMiddleware')
const authenticationMiddleWare = require('../middleware/authenticationMiddleWare')
var multer = require('multer'),
fs = require('fs');

const router = require('express').Router()
var path = require('path')

const DIR = './Public/';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
 })


router.get('/',(req, res) => {
  res.status(200).json({
    messgae: 'home'
  })
})
router.post('/createClass', upload.single('image'), Controller.createClass);
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.patch('/logout', Controller.logout)
router.get('/department', Controller.getDeparments)
router.get('/*.png', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../Public/' + req.originalUrl));
  } catch (error) {
    console.log(error);
  }
})
router.use(authenticationMiddleWare)
router.delete('/class/:id', Controller.deleteClass)
router.put('/class/:id', upload.single('image'), Controller.editClassSave)
router.get('/class/:id', Controller.getClassEdit)
router.get('/class', Controller.getClasses)
router.post('/absen', Controller.postAbsen)
router.put('/activeClass/:id', Controller.activeClass)
router.put('/finishClass/:id', Controller.finishClass)


router.use(errorHandler)

module.exports = router