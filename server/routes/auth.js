const Router = require('koa-router')
const auth = require('../controllers/user')

const router = Router()

router.get('/user/:id', auth.getUserInfo)
router.post('/login', auth.postUserAuth)
router.post('/logout', auth.clearUserAuth)

module.exports = router
