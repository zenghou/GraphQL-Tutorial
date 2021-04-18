import { gql } from '@apollo/client';

const GET_AUTHOR_QUERY = gql`
  query GetAuthorList {
    authors {
      name
      id
    }
  }
`;

const GET_BOOK_QUERY = gql`
  query GetBookList {
    books {
      name
      id
    }
  }
`;

export { GET_AUTHOR_QUERY, GET_BOOK_QUERY };
