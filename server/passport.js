import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import User from './models/users';

const GoogleStrategy = Strategy;

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

if (process.env.GOOGLE_APP_CLIENT_ID
    && process.env.GOOGLE_APP_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_CLIENT_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google/callback`,
    passReqToCallback: true,
  },
  async (request, accessToken, refreshToken, profile, done) => {
    if (!profile.verified) {
      return done(new Error('Google account is not verified'), false);
    }
    try {
      const user = await User.findOne({ email: profile.email });
      if (user && !user.isVerified) {
        return done(new Error('Local email found, but it is not verified'), false);
      }
      if (!user) {
        const newUser = new User({
          firstName: profile.given_name,
          lastName: profile.family_name,
          google: profile,
          email: profile.email,
          isVerified: true,
          hasLocalPassword: false,
        });
        await newUser.save();
        return done(null, newUser);
      }
      user.firstName = profile.given_name;
      user.lastName = profile.family_name;
      user.google = profile;
      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));
} else {
  console.warn('GOOGLE_APP_CLIENT_ID or GOOGLE_APP_SECRET environment variables are not defined ... google sosial auth will not work.');
}

export default passport;
