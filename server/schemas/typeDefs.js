const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID!
  username: String
  email: String
  bookCount: Int
  savedBooks: [ Book ]
}

type Book {
  bookId: String!
  authors: [String]
  description: String
  image: String
  link: String
  title: String!
}

type Auth {
  token: ID!
  user: User
}

input BookInput {
  bookId: String!
  authors: [String]
  description: String
  image: String
  link: String
  title: String!
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
  books: [Book]
}


type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  deleteUser(userId: ID!) : User
  saveBook( bookData: BookInput): User
  deleteBook(bookId: ID!) : User
}



`;

module.exports = typeDefs;