const admin = require('firebase-admin');
const serviceAccount = require('./firebase-config').adminConfig;
const dbUrl = require('./firebase-config').databaseURL;

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbUrl
});

exports.app = app;
