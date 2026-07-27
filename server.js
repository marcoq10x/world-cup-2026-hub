const express = require('express');
const cors = require('cors');
const mongodb = require('./db/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Initialize the session to keep users logged in
app.use(session({
  secret: 'worldcupsecret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({ origin: '*' }));

app.use('/', require('./routes'));

// Configure GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const db = mongodb.getDb().db();
    const user = await db.collection('users').findOne({ githubId: profile.id });
    if (user) return done(null, user);
    
    const newUser = {
      githubId: profile.id,
      username: profile.username,
      displayName: profile.displayName || profile.username,
      profileUrl: profile.profileUrl
    };
    await db.collection('users').insertOne(newUser);
    return done(null, newUser);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`Connected to DB and listening on ${port}`);
      });
    }
  }
});

module.exports = app;