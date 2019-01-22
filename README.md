## User list widget
That's a widget, that shows a list of users with filters, sorting and pagination. Also there's backend part, that
handles fetching data from Firestore database.

### Setup
Clone repo and install dependencies:
```
git clone https://github.com/allmaxgit/airvat-widget.git
cd airvat-widget
npm i
```
Next, change firebase credentials in following files:
```
./src/backend/db.ts
./src/seeding/firebase-config.js
./src/seeding/seed-db.js
```
Perform initial data seeding if needed:
```npm run seed```
Run backend server:
```npm run serve```
Start frontend development server:
```npm start```

And then you can visit ```http://localhost:8000/``` to see working widget.
### Comments
* We've decided to use backend database fetching mechanism to prevent reading of firebase credentials. If all data stored at public
sources, we can implement client-side data fetching.
* Filtering mechanism for those entries, that needs full-text search (i.e. Name and Surname) done on the backend side,
because full-text search not supported by Firestore and needs additional Algolia engine implementation. The search is case-sensitive.
* Filtering entries by date range and sorting done with abilities of Firestore engine.
* Date range picking done with native HTML date inputs respecting already selected range: 'from' field can't be later than 'to' and 'to' can't be earlier than 'from'. Date picking can be done with React Component with customization without any problems.
