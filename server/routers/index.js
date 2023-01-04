const Controller = require('../controllers')
const errorHandler = require('../middleware/errorHandlingMiddleware')

const router = require('express').Router()

router.get('/',(req, res) => {
  res.status(200).json({
    messgae: 'home'
  })
})
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/department', Controller.getDeparments)
router.post('/absen', Controller.postAbsen)
router.use(errorHandler)

module.exports = router