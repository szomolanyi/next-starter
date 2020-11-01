import passport from 'passport';
import { Strategy as GoogleStrategy} from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from './models/users';

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

if (process.env.FACEBOOK_APP_CLIENT_ID
  && process.env.FACEBOOK_APP_SECRET) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email', 'name'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user && !user.isVerified) {
        return done(new Error('Local email found, but it is not verified'), false);
      }
      if (!user) {
        const newUser = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          facebook: profile,
          email: profile.emails[0].value,
          isVerified: true,
          hasLocalPassword: false,
        });
        await newUser.save();
        return done(null, newUser);
      }
      user.firstName = profile.name.givenName;
      user.lastName = profile.name.familyName;
      user.facebook = profile;
      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));
} else {
  console.warn('FACEBOOK_APP_CLIENT_ID or FACEBOOK_APP_SECRET environment variables are not defined ... facebook social auth will not work.');
}

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
  console.warn('GOOGLE_APP_CLIENT_ID or GOOGLE_APP_SECRET environment variables are not defined ... google social auth will not work.');
}

export default passport;
