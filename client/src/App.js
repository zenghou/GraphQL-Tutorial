import BookList from './components/BookList';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // endpoint for graphql
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
       <h1> Ninja's Reading list</h1>
       <BookList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
