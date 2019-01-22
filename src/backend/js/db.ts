const firebase = require('@firebase/app').default;
require('@firebase/firestore');

firebase.initializeApp({
  apiKey: 'AIzaSyCnUnM019QkkEOwW74UIwctp1EBbZ5k1OM',
  authDomain: 'airvat-test-5cc58.firebaseapp.com',
  projectId: 'airvat-test-5cc58'
});

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
