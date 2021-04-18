import { useQuery, gql } from '@apollo/client';

const BOOK_LIST = gql`
  query GetBookList {
    books {
      name
      id
    }
  }
`;


const displayBooks = (loading, error, data) => {
  if (loading) {
    return (<div>Loading...</div>);
  } else if (error) {
    return (<div>Error ): </div>);
  } else {
    return data.books.map((book) => {
      // each child in array should have unique key prop
      // react uses this key to determine if component should be re-rendered
      return (<li key={book.id}>{book.name}</li>)
    })
  }
}


// stateless functional components cannot have methods, they need to be defined outside
function BookList() {
  const { loading, error, data } = useQuery(BOOK_LIST);
  return (<ul>
    {displayBooks(loading, error, data)}
  </ul>)
}

export default BookList;
