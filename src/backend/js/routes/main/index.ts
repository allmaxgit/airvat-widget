// const db = require('../../db.ts');
import db from '../../db';

const entryFilter = (account, filters) => !Object.keys(filters).map(filter => (
  !filters[filter] ||
  (account[filter] && (account[filter].indexOf(filters[filter]) >= 0))
)).some(result => result === false);

// const batchFilter = (data, filters) => data.filter(entry => (
//   entry.account && entryFilter(entry.account, filters)
// ));

const queryFilter = (query, filters) => {
  let result = query;
  Object.keys(filters).map(filter => {
    if (!filters[filter]) return;
    console.log('F', filter);
    result = result.where(`account.${filter}`, '==', filters[filter]);
  });

  return result;
};

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

  query = queryFilter(query, {
    firstName,
    surname,
    email,
    phone,
    residenceCity,
    residenceCountry,
  });

  // sort. not working with field filters.
  if (sortBy && sortBy === 'lastActive' && sortOrder) {
    query = query.orderBy(sortBy, sortOrder);
  } else if (sortBy && sortOrder) {
    query = query.orderBy(`${sortBy}`, sortOrder);
  }

  const limit = await query.get().then(snap => snap.size);

  if (parseInt(offset, 10) > 0) {
    const firstDocRef = await query.limit(parseInt(offset, 10)).get().then(snap => snap.docs[snap.docs.length - 1]);
    query = query.startAfter(firstDocRef);
  }

  query = query.limit(parseInt(count, 10));

  let users = await query
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }))
    });

  res.send({ success: true, users, limit });
};
