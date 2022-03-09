const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID
  username: String
  email: String
  friendCount: Int
  thoughts: [Thought]
  friends: [User]
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
  thoughts(username: String): [Thought]
  thought(_id: ID!): Thought
  }


type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  addThought(thoughtText: String!): Thought
  addReaction(thoughtId: ID!, reactionText: String!): Thought
  addFriend(friendId: ID!): User
}

type Auth {
  token: ID!
  user: User
}

`;

module.exports = typeDefs;