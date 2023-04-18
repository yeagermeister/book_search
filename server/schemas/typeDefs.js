const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUserById(_id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addSavedBook(userId: ID!, book: BookInput!): User!
    deleteSavedBook(bookId: String!): User
    login(email: String!, password: String!): Auth
  }

  input BookInput {
    bookId: String!
    authors: [String]!
    description: String!
    image: String
    link: String
    title: String!
  }
`;

module.exports = typeDefs;