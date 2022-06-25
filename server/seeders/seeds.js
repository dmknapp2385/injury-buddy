const { User, Injury } = require('../models');
const db = require('../config/connection');

const faker = require('faker');

const bodyPart = [
  'shoulder',
  'finger',
  'wrist',
  'knee',
  'back',
  'elbow',
  'other'
];

db.once('open', async () => {
  await User.deleteMany({});
  await Injury.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 15; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    userData.push({ username, email, firstName, lastName, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  //create friends
  for (let i = 0; i < 25; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.ops.length
      );
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create injuries
  for (i = 0; i < createdUsers.ops.length; i += 1) {
    const bodyPartNumber = Math.floor(Math.random() * bodyPart.length);
    const location = bodyPart[bodyPartNumber];
    const painType = faker.lorem.words(1);
    const howInjured = faker.lorem.words(Math.random() * 10);
    let cronic;
    if (Math.random() < 0.5) {
      cronic = true;
    } else {
      cronic = false;
    }
    const timeInjured = faker.random.number({ min: 1, max: 365 });

    const injuryData = await Injury.create({
      location,
      painType,
      howInjured,
      cronic,
      timeInjured
    });

    const updatedUser = await User.updateOne(
      { _id: createdUsers.ops[i]._id },
      { $addToSet: { injuries: injuryData._id } }
    );
  }
  console.log('All done with seeding!');
  process.exit(0);
});
