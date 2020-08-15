import models from '../../db'
import limiter from './limiter'
import validator from 'validator'

const auth = async (req, res, next) => {
  const user = await models.User.findOne({ token: req.params.token })
  if (!user) return res.status(401).send('Invalid token')
  if (user.type === 'free') {
    return limiter(req, res, next)
  }
  return next()
}

export default auth
