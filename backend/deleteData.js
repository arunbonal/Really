const mongoose = require('mongoose');
const User = require('./models/user'); // Assuming user model is in ./models/user.js
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

async function deleteUsersAndSessions() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');

    // Delete all users
    const userDeleteResult = await User.deleteMany({});
    console.log(`Deleted ${userDeleteResult.deletedCount} users.`);

    // Delete all sessions from the sessions collection
    const sessionDeleteResult = await mongoose.connection.db.collection('sessions').deleteMany({});
    console.log(`Deleted ${sessionDeleteResult.deletedCount} sessions.`);

  } catch (err) {
    console.error('Error deleting data:', err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected.');
    process.exit(0);
  }
}

deleteUsersAndSessions();
