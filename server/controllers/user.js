const mongoose = require('mongoose')
const jwt = require('koa-jwt')
const User = require('../models/user')

const getUserInfo = async (ctx) => {
  const id = ctx.request.id
  const result = await User.getUser
  ctx.body = result
}

const postUserAuth = async (ctx) => {
  const data = ctx.request.body
  console.log(data)
  const userInfo = await user.getUserByEmail(data.email)

  if (userInfo != null) {
    if (userInfo.authenticate(data.password)) {
      const userToken = {
        email: userInfo.email,
        id: userInfo._id,
      }
      const secret = 'vue-koa-admin'
      const token = jwt.sign(userToken, secret)
      ctx.body = {
        success: true,
        token: token,
      }
    } else {
      console.log('Invalid Password!')
      ctx.body = {
        success: false,
        info: 'Invalid Password!',
      }
    }
  } else {
    console.log('User not exist!')
    ctx.body = {
      success: false,
      info: 'User not exist!',
    }
  }
}

const clearUserAuth = async (ctx) => {
  ctx.body = {
    success: true,
    token: null,
  }
}
module.exports = {
  getUserInfo,
  postUserAuth,
  clearUserAuth,
}
