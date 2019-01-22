// const db = require('../../db.ts');
import db from '../../db';

const entryFilter = (account, filters) => !Object.keys(filters).map(filter => (
  !filters[filter] ||
  (account[filter] && (account[filter].indexOf(filters[filter]) >= 0))
)).some(result => result === false);

const batchFilter = (data, filters) => data.filter(entry => (
  entry.account && entryFilter(entry.account, filters)
));

module.exports = async (req, res) => {
  const {
    firstName,
    surname,
    count = 15,
    offset = 0,
    residenceCity,
    residenceCountry,
    email,
    phone,
    sortBy,
    sortOrder,
    lastActiveFrom,
    lastActiveTo,
  } = req.query;

  let query = db.collection('users');

  if (lastActiveFrom && Date.parse(lastActiveFrom)) {
    query = query.where('lastActive', '>=', Date.parse(lastActiveFrom));
  }

  if (lastActiveTo && Date.parse(lastActiveTo)) {
    query = query.where('lastActive', '<=', Date.parse(lastActiveTo));
  }

  if (sortBy && sortBy === 'lastActive' && sortOrder) {
    query = query.orderBy(sortBy, sortOrder);
  } else if (sortBy && sortOrder) {
    query = query.orderBy(`account.${sortBy}`, sortOrder);
  }

  let users = await query.get()
    .then(querySnapshot => querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })));

  // Fulltext search needs Agolia or in-place filtering
  users = batchFilter(users, {
    firstName,
    surname,
    email,
    phone,
    residenceCity,
    residenceCountry,
  });

  const limit = users.length;

  users = users.slice(parseInt(offset, 10), (parseInt(offset, 10) + parseInt(count, 10)));

  res.send({ success: true, users, limit });
};
