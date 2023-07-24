const Controller = require('../controllers')
const errorHandler = require('../middleware/errorHandlingMiddleware')
const authenticationMiddleWare = require('../middleware/authenticationMiddleWare')
var multer = require('multer'),
fs = require('fs');

const router = require('express').Router()

const DIR = './Public/';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
    // const dir = path.join(__dirname, '../client/uploads/'+file.originalname);
    // console.log(dir,'<<dir');
    // try {
    //   fs.existsSync(dir, exist => {
    //     if (!exist) {
    //       return fs.mkdirSync(dir, error => cb(error, dir));
    //     } else {
    //       return cb(null, dir);
    //     }
    //   })
    // } catch (error) {
    //   console.log(moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss') + ' : ' + 'ex create folder', error);
    // }
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
router.post('/createClass', upload.single('image'), (req, res, next) => {
  try {
    console.log('<<>>>');
    res.send('data has been uploaded');
  } catch (error) {
    console.log(error);
  }
});
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.patch('/logout', Controller.logout)
// router.use(authenticationMiddleWare)
router.get('/department', Controller.getDeparments)
router.get('/class', Controller.getClasses)
router.post('/absen', Controller.postAbsen)

router.use(errorHandler)

module.exports = router