const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

module.exports = function initPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (profile, done) => {
        try {
          const email = profile.emails?.[0]?.value
          const username = profile.displayName
          const avatar = profile.photos?.[0]?.value

          if (!email) return done(new Error('No email from Google'), null)

          let user = await User.findOne({ email })

          if (!user) {
            user = await User.create({
              username,
              email,
              avatar,
              provider: 'google',
            })
          }

          return done(null, user)
        } catch (err) {
          return done(err, null)
        }
      }
    )
  )

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (e) {
      done(e, null)
    }
  })
}
