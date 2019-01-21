const firebase = require('@firebase/app').default;
require('@firebase/firestore');

module.exports = async (req, res) => {
  res.send({ success: true, message: 'Hello world!' });
};
