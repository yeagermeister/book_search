const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]!
  }

  type Book {
    authors: [String]!
    description: String!
    bookId: String!
    image: String!
    title: String!
    _id: ID!
  }

  type Query {
    getUserById(id: ID!): User
    # other queries you want to define
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addSavedBook(book: BookInput!): User
    deleteSavedBook(bookId: String!): User
    loginUser(email: String!, password: String!): Token
    # other mutations you want to define
  }

  input BookInput {
    authors: [String]!
    description: String!
    bookId: String!
    image: String!
    title: String!
  }

  type Token {
    token: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Subscription {
    # define your subscription types here
  }
`;

module.exports = typeDefs;
