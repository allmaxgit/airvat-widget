const db = require('../../db.js');

const dataFilter = (data, field, value) => (
  field && value
    ? data.filter(entry => entry.account && entry.account[field] && entry.account[field].indexOf(value) >= 0)
    : data
);

module.exports = async (req, res) => {
  const {
    firstName,
    surname,
    count,
    offset,
    residenceCity,
    residenceCountry,
    email,
    phone,
  } = req.query;

  let users = await db.collection('users').get()
    .then(querySnapshot => querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })));

  users = dataFilter(users, 'firstName', firstName);
  users = dataFilter(users, 'surname', surname);
  users = dataFilter(users, 'email', email);
  users = dataFilter(users, 'phone', phone);
  users = dataFilter(users, 'residenceCity', residenceCity);
  users = dataFilter(users, 'residenceCountry', residenceCountry);
  users = users.slice(offset, (offset + count));
  
  const limit = users.length;

  res.send({ success: true, users, limit });
};
