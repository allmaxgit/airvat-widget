/* eslint-disable no-console */
const moment = require('moment');
const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const admin = require('./firebase-app').app;

const MAX_TRIPS_PER_USER = 3;
const MAX_RECEIPTS_PER_TRIP = 10;
const MAX_RECEIPT_ITEMS_PER_RECEIPT = 10;
const USERS_TO_CREATE = 200;

// Mock data
const names = ['OLIVIA', 'RUBY', 'EMILY', 'GRACE', 'JESSICA', 'CHLOE', 'SOPHIE', 'LILY', 'AMELIA', 'EVIE', 'MIA', 'ELLA', 'CHARLOTTE', 'LUCY', 'MEGAN', 'ELLIE', 'ISABELLE', 'ISABELLA', 'HANNAH', 'KATIE', 'AVA', 'HOLLY', 'SUMMER', 'MILLIE', 'DAISY', 'PHOEBE', 'FREYA', 'ABIGAIL', 'POPPY', 'ERIN', 'EMMA', 'MOLLY', 'IMOGEN', 'AMY', 'JASMINE', 'ISLA', 'SCARLETT', 'LEAH', 'SOPHIA', 'ELIZABETH', 'EVA', 'BROOKE', 'MATILDA', 'CAITLIN', 'KEIRA', 'ALICE', 'LOLA', 'LILLY', 'AMBER', 'ISABEL', 'LAUREN', 'GEORGIA', 'GRACIE', 'ELEANOR', 'BETHANY', 'MADISON', 'AMELIE', 'ISOBEL', 'PAIGE', 'LACEY', 'SIENNA', 'LIBBY', 'MAISIE', 'ANNA', 'REBECCA', 'ROSIE', 'TIA', 'LAYLA', 'MAYA', 'NIAMH', 'ZARA', 'SARAH', 'LEXI', 'MADDISON', 'ALISHA', 'SOFIA', 'SKYE', 'NICOLE', 'LEXIE', 'FAITH', 'MARTHA', 'HARRIET', 'ZOE', 'EVE', 'JULIA', 'AIMEE', 'HOLLIE', 'LYDIA', 'EVELYN', 'ALEXANDRA', 'MARIA', 'FRANCESCA', 'TILLY', 'FLORENCE', 'ALICIA', 'ABBIE', 'EMILIA', 'COURTNEY', 'MARYAM', 'ESME', ' ', 'JACK', 'OLIVER', 'THOMAS', 'HARRY', 'JOSHUA', 'ALFIE', 'CHARLIE', 'DANIEL', 'JAMES', 'WILLIAM', 'SAMUEL', 'GEORGE', 'JOSEPH', 'LEWIS', 'ETHAN', 'MOHAMMED', 'DYLAN', 'BENJAMIN', 'ALEXANDER', 'JACOB', 'RYAN', 'LIAM', 'JAKE', 'MAX', 'LUKE', 'TYLER', 'CALLUM', 'MATTHEW', 'JAYDEN', 'OSCAR', 'ARCHIE', 'ADAM', 'RILEY', 'HARVEY', 'HARRISON', 'LUCAS', 'MUHAMMAD', 'HENRY', 'ISAAC', 'LEO', 'CONNOR', 'EDWARD', 'FINLEY', 'LOGAN', 'NOAH', 'CAMERON', 'ALEX', 'OWEN', 'RHYS', 'NATHAN', 'JAMIE', 'MICHAEL', 'MASON', 'TOBY', 'AARON', 'CHARLES', 'BEN', 'THEO', 'LOUIS', 'FREDDIE', 'FINLAY', 'LEON', 'HARLEY', 'DAVID', 'MOHAMMAD', 'REECE', 'KIAN', 'KAI', 'KYLE', 'BRANDON', 'HAYDEN', 'ZACHARY', 'KIERAN', 'LUCA', 'ASHTON', 'BAILEY', 'SEBASTIAN', 'GABRIEL', 'SAM', 'EVAN', 'BRADLEY', 'ELLIOT', 'JOHN', 'TAYLOR', 'JOE', 'COREY', 'REUBEN', 'JOEL', 'ROBERT', 'ELLIS', 'BLAKE', 'AIDAN', 'LOUIE', 'CHRISTOPHER', 'EWAN', 'JAY', 'MORGAN', 'BILLY', 'SEAN', 'ZAK'];

const cities = ['Aberdeen', 'Aldershot', 'Altrincham', 'Ashford', 'Atherton', 'Aylesbury', 'Bamber Bridge', 'Bangor', 'Barnsley', 'Barry', 'Basildon', 'Basingstoke', 'Bath', 'Batley', 'Bebington', 'Bedford', 'Beeston', 'Belfast', 'Birkenhead', 'Birmingham', 'Blackburn', 'Blackpool', 'Bloxwich', 'Bognor Regis', 'Bolton', 'Bootle', 'Bournemouth', 'Bracknell', 'Bradford', 'Brentwood', 'Brighton and Hove', 'Bristol', 'Burnley', 'Burton upon Trent', 'Bury', 'Cambridge', '/ Milton', 'Cannock', 'Canterbury', 'Cardiff', 'Carlisle', 'Carlton', 'Chatham', 'Chelmsford', 'Cheltenham', 'Chester', 'Chesterfield', 'Christchurch', 'Clacton-on-Sea', 'Colchester', 'Corby', 'Coventry', 'Craigavon', 'incl. Lurgan, Portadown', 'Crawley', 'Crewe', 'Crosby', 'Cumbernauld', 'Darlington', 'Derby', 'Derry', 'Londonderry', 'Dewsbury', 'Doncaster', 'Dudley', 'Dundee', 'Dunfermline', 'Durham', 'Eastbourne', 'East Kilbride', 'Eastleigh', 'Edinburgh', 'Ellesmere Port', 'Esher', 'Ewell', 'Exeter', 'Farnborough', 'Filton', 'Folkestone', 'Gateshead', 'Gillingham', 'Glasgow', 'Gloucester', 'Gosport', 'Gravesend', 'Grays', 'Grimsby', 'Guildford', 'Halesowen', 'Halifax', 'Hamilton', 'Harlow', 'Harrogate', 'Hartlepool', 'Hastings', 'Hemel Hempstead', 'Hereford', 'High Wycombe', 'Huddersfield', 'Ipswich', 'Keighley', 'Kettering', 'Kidderminster', 'Kingston upon Hull', 'Hull', 'Kingswinford', 'Kirkcaldy', 'Lancaster', 'Leeds', 'Leicester', 'Lincoln', 'Littlehampton', 'Liverpool', 'Livingston', 'London', 'Loughborough', 'Lowestoft', 'Luton', 'Macclesfield', 'Maidenhead', 'Maidstone', 'Manchester', 'Mansfield', 'Margate', 'Middlesbrough', 'Milton Keynes', 'Neath', 'Newcastle-under-Lyme', 'Newcastle upon Tyne', 'Newport', 'Newtownabbey', 'Northampton', 'Norwich', 'Nottingham', 'Nuneaton', 'Oldham', 'Oxford', 'Paignton', 'Paisley', 'Peterborough', 'Plymouth', 'Poole', 'Portsmouth', 'Preston', 'Rayleigh', 'Reading', 'Redditch', 'Rochdale', 'Rochester', 'Rotherham', 'Royal Leamington Spa', 'Royal Tunbridge Wells', 'Rugby', 'Runcorn', 'Sale', 'Salford', 'Scarborough', 'Scunthorpe', 'Sheffield', 'Shoreham-by-Sea', 'Shrewsbury', 'Sittingbourne', 'Slough', 'Smethwick', 'Solihull', 'Southampton', 'Southend-on-Sea', 'Southport', 'South Shields', 'Stafford', 'St Albans', 'Stevenage', 'St Helens', 'Stockport', 'Stockton-on-Tees', 'Stoke-on-Trent', 'Stourbridge', 'Sunderland', 'Sutton Coldfield', 'Swansea', 'Swindon', 'Tamworth', 'Taunton', 'Telford', 'Torquay', 'Tynemouth', 'Wakefield', 'Wallasey', 'Walsall', 'Walton-on-Thames', 'Warrington', 'Washington', 'Watford', 'Wellingborough', 'Welwyn Garden City', 'West Bromwich', 'Weston-super-Mare', 'Weymouth', 'Widnes', 'Wigan', 'Willenhall', 'Woking', 'Wolverhampton', 'Worcester', 'Worthing', 'Wrexham', 'York'];

const countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'The Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic  Republic of the', 'Congo, Republic of the', 'Costa Rica', 'Côte d’Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia,  Federated States of', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and  the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Sudan, South', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];

const euCountries = ['Austria', 'Italy', 'Belgium', 'Latvia', 'Bulgaria', 'Lithuania', 'Croatia', 'Luxembourg', 'Cyprus', 'Malta', 'Czechia', 'Netherlands', 'Denmark', 'Poland', 'Estonia', 'Portugal', 'Finland', 'Romania', 'France', 'Slovakia', 'Germany', 'Slovenia', 'Greece', 'Spain', 'Hungary', 'Sweden', 'Ireland', 'United Kingdom'];

const itemNames = ['belt', 'boots', 'cap', 'coat', 'dress', 'gloves', 'hat', 'jacket', 'jeans', 'pajamas', 'pants', 'raincoat', 'scarf', 'shirt', 'shoes', 'skirt', 'slacks', 'slippers', 'socks', 'stockings', 'suit', 'sweater', 'sweatshirt', 't-shirt', 'tie', 'trousers', 'underclothes', 'underpants', 'undershirt'];


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getRandomPrice(max) {
  return +(Math.random() * max).toFixed(2);
}

function getRandomDate(start, end) {
  const randomMinutes = Math.random() * end.diff(start, 'minutes');
  return moment(start.clone().add(randomMinutes, 'minutes'));
}

function createRandomCountry(isEU) {
  const countryCollection = isEU ? euCountries : countries;

  return countryCollection[getRandomNumber(countryCollection.length)];
}

function createRandomCity() {
  return cities[getRandomNumber(cities.length)];
}

function createRandomName() {
  const randUserFirstNameIndex = Math.floor(Math.random() * names.length);
  const randUserSurnameIndex = Math.floor(Math.random() * names.length);

  return `${names[randUserFirstNameIndex]} ${names[randUserSurnameIndex]}`;
}


// RECEIPT ITEMS
function createRandomReceiptItems(ownerId, tripId) {
  const itemsNo = getRandomNumber(MAX_RECEIPT_ITEMS_PER_RECEIPT);
  return [...Array(itemsNo).keys()].map(() => createRandomReceiptItem(ownerId, tripId));
}

function createRandomReceiptItem(ownerId, tripId) {
  const itemName = itemNames[getRandomNumber(itemNames.length)];

  return {
    amount: getRandomPrice(250),
    ccy: '$',
    owner: ownerId,
    tripId,
    name: itemName,
    description: 'Loremp Ipsuom dolorem asit',
  };
}

// USER RECEIPTS
function createRandomReceipts(trips) {
  return _.flatMap(trips.map((trip) => {
    const itemsNo = getRandomNumber(MAX_RECEIPTS_PER_TRIP);
    return [...Array(itemsNo).keys()].map(() => createRandomReceipt(trip.owner, trip.tripId, trip.arrivalDate, trip.departureDate));
  }));
}

function createRandomReceipt(ownerId, tripId, tripStart, tripEnd) {
  const createdAt = getRandomDate(moment(tripStart), moment(tripEnd));

  return {
    createdAt: +createdAt,
    owner: ownerId,
    status: 'pending', // Pending, Accepted, Rejected,
    tripId,
    store: {
      storeCreatedTime: +createdAt.subtract(getRandomNumber(moment.duration(1, 'month')), 'milliseconds'),
      storeContact: '',
      storeAddress: null,
    },
    items: createRandomReceiptItems(ownerId, tripId),
    uploads: [{
      downloadURL: 'https://via.placeholder.com/150',
      metadata: {
        contentType: 'image/jpeg'
      }
    }]
  };
}

// TRIPS

function createRandomTrips(ownerId) {
  const tripNo = getRandomNumber(MAX_TRIPS_PER_USER);
  return [...Array(tripNo).keys()].map(x => createRandomTrip(ownerId));
}

function createRandomTrip(ownerId) {
  const tripId = uuidv4();

  // defined upper / lower bounds for any trip start/end
  const tripMinStart = getRandomDate(moment('2010-01-01'), moment());
  const plusThreeMonths = tripMinStart.clone().add(3, 'months');
  const tripMaxEnd = getRandomDate(tripMinStart, plusThreeMonths);

  return {
    tripId,
    arrivalCountry: createRandomCountry(true),
    arrivalDate: +tripMinStart,
    createdAt: +getRandomDate(tripMinStart, tripMaxEnd),
    departureCountry: createRandomCountry(),
    departureDate: +tripMaxEnd,
    owner: ownerId,
    status: 'pending' // Pending, Incomplete, Complete
  };
}

// USER AUTH
function createRandomUserAuth(email, displayName) {
  return {
    email,
    displayName,
    emailVerified: true,
    password: 'secretPassword',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false
  };
}

// USER ACCOUNT
function createRandomUserAccount() {
  const randomName = createRandomName();

  return {
    address1: 'Address 1',
    address2: 'Address Line 2',
    residenceCity: createRandomCity(),
    residenceCountry: 'United Kingdon',
    defaultRefundMethodId: '',
    dob: +getRandomDate(moment('1960-01-01'), moment('2005-01-01')),
    passportNo: '',
    displayName: randomName,
    firstName: randomName.split(' ')[0],
    surname: randomName.split(' ')[1],
    email: `${randomName.split(' ').join('.') + getRandomNumber(100)}@testemail.com2`,
    phone: `+${parseInt(Math.random() * (10 ** 11), 10)}`,
  };
}

// REFUND REQUEST
function createRandomRefundRequests(trips) {
  const randomMissingRefundRequests = getRandomNumber(trips.length);

  return trips.slice(randomMissingRefundRequests).map(trip => createRandomRefundRequest(trip.owner, trip.tripId, trip.arrivalDate, trip.departureDate));
}

function createRandomRefundRequest(ownerId, tripId, tripStart, tripEnd) {
  return {
    createdAt: +getRandomDate(moment(tripStart), moment(tripEnd)),
    tripId,
    owner: ownerId,
    primaryEmail: 'test.refund@test.com',
    status: getRandomNumber(4),
  };
}


// REFUND METHODS

function createRandomRefundMethods(ownerId, tripsMinStart, tripsMaxEnd) {
  const reqNo = getRandomNumber(4);
  return [...Array(reqNo).keys()]
    .map(() => createRandomRefundMethod(ownerId, tripsMinStart, tripsMaxEnd));
}

function createRandomRefundMethod(ownerId, start, end) {
  const types = ['BankAccount', 'Alipay', 'Paypal', 'Card'];
  const type = types[getRandomNumber(types.length)];
  const createdAt = +getRandomDate(start, end);

  if (type === types[1] || type === types[2]) {
    return {
      createdAt,
      email: `${type}.${type}.com`,
      owner: ownerId,
      type,
    };
  } else if (type === types[0]) {
    return {
      createdAt,
      owner: ownerId,
      accountHolderName: '',
      countryName: '',
      bankName: '',
      accountNumber: '',
      swiftCode: '',
      type
    };
  }
  return {
    owner: ownerId,
    cardNumber: '0000-0000-0000',
    createdAt,
    type
  };
}


// CREATE USER
function createRandomUser() {
  const now = moment();

  const ownerId = uuidv4();

  const trips = createRandomTrips(ownerId);

  const tripsMinStartDate = trips.length ? moment(Math.min(...trips.map(x => +x.arrivalDate))) : moment();
  const tripsMaxEndDate = trips.length ? moment(Math.max(...trips.map(x => +x.departureDate))) : moment();


  const userAccount = createRandomUserAccount();
  const userAuth = createRandomUserAuth(userAccount.email, userAccount.displayName);

  const lastActive = +getRandomDate(moment(Math.max(...trips.map(x => +x.arrivalDate))), now) || +now;

  console.log('computed last Active:', lastActive);
  const res = {
    trips,
    account: userAccount,
    auth: userAuth,
    displayName: userAccount.displayName,
    lastActive,
    receipts: trips.length && createRandomReceipts(trips) || [],
    refundRequests: trips.length && createRandomRefundRequests(trips) || [],
    refundMethods: createRandomRefundMethods(ownerId, tripsMinStartDate, tripsMaxEndDate),
  };

  console.log(JSON.stringify(res, null, 2));

  return res;
}


asyncForEach(
  [...Array(USERS_TO_CREATE).keys()],
  async (idx) => {
    const randomUser = createRandomUser();

    console.log('Random User Generated');

    // create user auth
    const userResult = await admin.auth().createUser(randomUser.account).catch((err) => {
      console.log(err);
    });

    console.log('Random User Auth Created');

    const userRef = admin.database().ref().child(`users/${userResult.uid}`);

    console.log(userResult);
    const userData = {
      email: userResult.email,
      name: userResult.displayName,
      firstName: userResult.displayName.split(' ')[0],
      surname: userResult.displayName.split(' ')[1],
      account: randomUser.account,
      meta: { ...userResult.metadata, creationTime: +moment(userResult.metadata) },
      lastActive: randomUser.lastActive,
    };

    userRef.set(userData);


    admin.firestore().collection('users').doc(userResult.uid).set(userData);

    console.log('Random User Firebase Entry Created');

    const tripEntryKeys = [];
    const refundMethodKeys = [];
    const receiptKeys = [];

    console.log('Start creating user trips: (', randomUser.trips.length, ')');

    // generate and assign user trips
    await asyncForEach(randomUser.trips, async (trip, idx) => {
      const tripsRef = admin.database().ref().child('trips');

      const tripEntryKey = await tripsRef.push({
        ...trip,
        owner: userResult.uid
      }).getKey();

      console.log('\tUser trip entry generated', tripEntryKey);
      // asign user trip id
      await userRef.child(`trips/${tripEntryKey}`).set(true);
      tripEntryKeys[trip.tripId] = tripEntryKey;
    });

    console.log('Start creating user refund requests per trip: (', randomUser.refundRequests.length, ')');
    // generate and assign refund tax form request
    const refundRequestRef = admin.database().ref().child('refundRequests');

    await asyncForEach(randomUser.refundRequests, async (req) => {
      console.log('\tCreating user refund request for trip:', tripEntryKeys[req.tripId]);
      const tripRefundRequestKey = refundRequestRef.push({
        ...req,
        owner: userResult.uid,
        tripId: tripEntryKeys[req.tripId]
      }).getKey();

      console.log('\t\tUser refund request entry generated for trip:', tripEntryKeys[req.tripId]);

      await userRef.child(`refundRequests/${tripRefundRequestKey}`).set({ tripId: tripEntryKeys[req.tripId] });
    });


    console.log('Start creating user refund methods: (', randomUser.refundMethods.length, ')');
    // generate and assign refund methods
    await asyncForEach(randomUser.refundMethods, async (refundMethod, idx) => {
      const refundMethodsRef = admin.database().ref().child('refundMethods');

      console.log('\tCreating refund method: ', refundMethod.type);
      const refundMethodsKey = await refundMethodsRef.push({
        ...refundMethod,
        owner: userResult.uid
      }).getKey();

      console.log('\tUser refund method entry created: ', refundMethodsKey);
      // assign user refund method id
      refundMethodKeys.push(refundMethodsKey);
      await userRef.child(`refundMethods/${refundMethodsKey}`).set(true);
      await userRef.child('account/defaultRefundMethodId').set(refundMethodsKey);
    });

    console.log('Start creating user receipts: (', randomUser.receipts.length, ')');
    // generate and assign receipts
    await asyncForEach(randomUser.receipts, async (receipt, idx) => {
      const receiptRef = admin.database().ref().child('receipts');


      console.log('\tCreating receipt per trip: ', tripEntryKeys[receipt.tripId]);

      console.log('\t\tCreating receipt items: count ', receipt.items.length);

      const receiptItems = receipt.items.map(item => ({
        ...item,
        tripId: tripEntryKeys[receipt.tripId],
        owner: userResult.uid,
      }));

      const receiptKey = await receiptRef.push({
        ...receipt,
        owner: userResult.uid,
        tripId: tripEntryKeys[receipt.tripId],
        items: receiptItems
      }).getKey();

      console.log('\tUser receipt entry created: ', receiptKey, ' for trip: ', tripEntryKeys[receipt.tripId]);
      // assign user receipt and trip id
      receiptKeys.push(receiptKey);
      await userRef.child(`receipts/${receiptKey}`).set({
        tripId: tripEntryKeys[receipt.tripId],
      });
    });

    console.log('User entry successfully saved');
  }
);
