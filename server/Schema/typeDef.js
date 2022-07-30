//import the gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type Injury {
    _id: ID!
    location: String!
    painType: String
    howInjured: String
    cronic: Boolean
    timeInjured: Int
  }

  input InjuryInjury {
    location: String!
    painType: String
    howInjured: String
    cronic: Boolean
    timeInjured: Int
  }

  type User {
    _id: ID
    username: String
    email: String
    firstName: String
    lastName: String
    friends: [User]
    injuries: [Injury]
    password: String
  }


  input NewUser {
    email: String!
    password: String!
    lastName: String!
    firstName: String!
    username: String!
  }

  type Query {
    me: User
    users: [User]
    injuries: [Injury]
    user: User
    injuryLocation(location: String!): [Injury]
  }

  type Mutation {
    login(email: String!, password: String!): Auth,
    signup(input: NewUser): Auth
  }
`;

//export
module.exports = typeDefs;
