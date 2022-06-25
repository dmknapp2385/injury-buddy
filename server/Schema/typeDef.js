//import the gql tagged template function 
const {gql} = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
    type User {
        _id: ID, 
        username: String, 
        email: String, 
        firstName: String, 
        lastName: String, 
        friends: [User], 
        injuries: [Injury], 
        climbingType: String
    } 
     
    type Injury {
        _id: ID, 
        location: String,
        painType: String,
        howInjured: String, 
        cronic: Boolean, 
        timeInjured: Int
    }

    type Query {
        me: User
        users: [User]
        injuries: [Injury]
        user: User
        injuryLocation (location:String!): [Injury]
    }
`;

//export
module.exports = typeDefs;
