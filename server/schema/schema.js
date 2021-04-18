const graphql = require('graphql');
const _ = require('lodash');

// defines the shape of the graph

// 1. define the object type(s)
// 2. define the relationships between types
// 3. define root query; how can use initially jump into graph and grab data

const { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLInt, 
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
} = graphql; // ES6 destructuring

// const booksData = [
//   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorid: '1'},
//   { name: 'Final Empire', genre: 'Fantasy', id: '2', authorid: '2'},
//   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorid: '3'},
//   { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorid: '2'},
//   { name: 'The Color of Magic', genre: 'Fantasy', id: '5', authorid: '3'},
//   { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorid: '3'},
// ]

// const authors = [
//   { name: 'Peter Russo', age: 44, id: '1'},
//   { name: 'Brandon Sanderman', age: 42, id: '2'},
//   { name: 'Terry Prince', age: 64, id: '3'},
// ]

const BookType = new GraphQLObjectType({
  name: 'Book',
  // needs to be a function because code is interpreted from top to bottom
  // if AuthorType is defined below and we used a field property instead of function, 
  // the type needs to be defined first (static v.s. dynamic type checking)
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorid })
      }
    } 
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  // needs to be a function 
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }, 
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(booksData, { authorid: parent.id })
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // no need to be function since it's static
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) { 
        // args.id to get id
        // code to get data from db/other source
        // return _.find(booksData, {id: args.id});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return booksData;
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
