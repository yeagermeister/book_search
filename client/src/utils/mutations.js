import { gql } from "@apollo/client";
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export const ADD_BOOK = gql`
mutation AddSavedBook($userId: ID!, $book: BookInput!) {
  addSavedBook(userId: $userId, book: $book) {
    username
    savedBooks {
      bookId
    }
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($userId: ID!, $book: BookDelete!) {
    deleteSavedBook(userId: $userId, book: $book) {
      username
      savedBooks {
        bookId
      }
    }
  }

  input BookInput {
    bookId: String!
    authors: [String]!
    description: String!
    image: String
    link: String
    title: String!
  }

  input BookDelete {
    bookId: String!
  }
`;