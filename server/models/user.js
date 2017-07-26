const mongoose = require('mongoose')
const uuid = require('node-uuid')
const timestamps = require('mongoose-timestamp')
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const R = require('ramda')

const Schema = mongoose.Schema

const validateLocalStrategyProperty = function(property) {
  return property.length
}

const validateLocalStrategyPassword = function(password) {
  return password && password.length > 6
}

const ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
}

const TEAMS = {
    BUSINESS: 'BUSINESS',
    OPERATIONS: 'OPERATIONS',
    DESIGN: 'DESIGN',
}

const User = new Schema({
  _id: { type: String, default: uuid.v4, required: true, unique: true },
  email: { 
    type: String, 
    default: '',
    trim: true,
    required: true,
    unique: true,
    validate: [validateLocalStrategyProperty, 'Please fill in your email'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'Password should be longer']
  },
  salt: { type: String },
  roles: {
    type: [{ type: String, 'enum': R.values(ROLES) }],
    default: [ROLES.USER]
  },
  teams: {
    type: [{ type: String, 'enum': R.values(TEAMS) }],
    default: []
  },
})

User.plugin(timestamps)
User.plugin(uniqueValidator)

User.pre('save', function(next) {
  if (!this.salt) {
    this.salt = this.makeSalt()
    this.password = this.hashPassword(this.password)
  }
  next()
})

User.methods.makeSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('base64')
  } else {
    return password
  }
}

User.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password)
}

User.statics.getUserByEmail = function(userEmail) {
  return this.findOne({ email: userEmail })
}

User.statics.getUserById = function(id) {
  return this.findOne({ _id: id }, '-password -salt')
}

const user = mongoose.model('User', User)

module.exports = user 
