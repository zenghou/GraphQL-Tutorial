const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  // id is automatically created
  name: String,
  genre: String,
  authorId: String,
});

// model = collection in db
// collection is called 'Book', and the objects will look like bookSchema
module.exports = mongoose.model('Book', bookSchema);
