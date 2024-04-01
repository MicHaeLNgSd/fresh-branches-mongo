// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

//CREATE

//one
db.users.insertOne({
  firstName: 'Test',
  lastName: 'Testovich',
  email: 'user1@user.gmail.com',
  isMale: true,
  height: 1.91,
  birthday: new Date(1990, 5, 15),
  address: {
    city: 'Zaporizhzhia',
    country: 'Ukraine',
  },
});

//many
db.users.insertMany([{}]);

db.users.find({ firstName: 'Test' });
