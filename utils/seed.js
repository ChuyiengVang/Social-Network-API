const connection = require('../config/connection');
 
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'usersDB' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('usersDB');
  }

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
