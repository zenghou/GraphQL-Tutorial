const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  // id is automatically created
  name: String,
  genre: String,
  // Manual references where you save the _id field of one document in another document as a reference. Then your application can run a second query to return the related data. These references are simple and sufficient for most use cases.
  authorId: String,
});

// model = collection in db
// collection is called 'Book', and the objects will look like bookSchema
module.exports = mongoose.model('Book', bookSchema);
