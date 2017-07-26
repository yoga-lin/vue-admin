const Koa = require('koa')
const Router = require('koa-router')
const json = require('koa-json')
const logger = require('koa-logger')
const jwt = require('koa-jwt')
const bodyParser = require('koa-bodyparser')
const auth = require('./routes/auth')
const api = require('./routes/api')
const DB = require('./config/db')
const Config = require('./config/default')

DB.connect(Config.mongodb)
DB.initDB()

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(json())
app.use(logger())

app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', err => {
  log.error('server error', err)
})

router.use('/auth', auth.routes())
router.use('/api', jwt({ secret: 'vue-koa-admin' }), api.routes())

app.use(router.routes())

app.listen(3000, () => {
  console.log('Koa is listening in 3000')
})

module.exports = app
