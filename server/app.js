const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());

// set up middleware
// graphqlHTTP must take in a schema
// schema is essentially the graph 
app.use('/graphql', graphqlHTTP({
  // schema: schema 
  schema, // ES6 syntax
  graphiql: true,
}));


mongoose.connect(
  process.env.MONGODB_URL, 
  {useNewUrlParser: true }, 
  (err, db) => {
    if (err) {
      console.log('error connecting');
    } else {
      console.log('connected to db');
    }
  },
);

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Now listening to request on ${process.env.PORT_NUMBER}`);
});
