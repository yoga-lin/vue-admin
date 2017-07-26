const User = require('../models/user')

const initDB = async () => {
  let user = await User.findOne({ email: 'admin@implus.tech' })
  if (!user) {
    let result = await User.create({
      email: 'admin@implus.tech',
      password: 'hehehehe',
      roles: ['USER', 'ADMIN'],
    })
  }
}
module.exports = initDB
