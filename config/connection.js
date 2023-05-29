const { connect, connection } = require('mongoose');
 
const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://rxs291:Never5660217!@classactivities.myu493z.mongodb.net/socialNetworkDB';

connect(connectionString);

module.exports = connection;
