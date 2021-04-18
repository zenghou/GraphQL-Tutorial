const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// set up middleware
// graphqlHTTP must take in a schema
// schema is essentially the graph 
app.use('/graphql', graphqlHTTP({
  // schema: schema 
  schema, // ES6 syntax
  graphiql: true,
}));


mongoose.connect(
  'mongodb+srv://zenghou:admin123@cluster0.2tf21.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
  {useNewUrlParser: true }, 
  (err, db) => {
    if (err) {
      console.log('error connecting');
    } else {
      console.log('connected to db');
    }
  },
);

const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Now listening to request on ${PORT_NUMBER}`);
});
