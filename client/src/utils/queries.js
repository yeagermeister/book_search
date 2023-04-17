import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        title
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query getBooks($searchTerm: String!) {
    books(searchTerm: $searchTerm) {
      authors
      description
      bookId
      image
      title
    }
  }
`;
