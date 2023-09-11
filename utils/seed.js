const connection = require('../config/connection');
const { User, Thought } = require('../models');
 
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'usersDB' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('usersDB');
  }

  await User.collection.insertOne();

 // await Thought.collection.insertOne(thoughts);

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
