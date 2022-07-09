//import models from db here
const { AuthenticationError } = require('apollo-server-express');
//import token for auth here
const { signToken } = require('../utils/auth.js');
const { User, Injury } = require('../models');

const resolvers = {
  Query: {
    //find current logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate('injuries')
          .populate('friends');
        return userData;
      }
      throw new AuthenticationError('Not Logged in');
    },
    // find all users
    users: async () => {
      const usersData = await User.find()
        .populate({ path: 'injuries' })
        .populate({ path: 'friends'});
      return (usersData);
    },
    // find all injuries
    injuries: async () => {
      const injuriesData = await Injury.find().select('-__v');
      return injuriesData;
    }, 

    // find injury by location

    // find user by id
  }, 
  Mutation: {
    //login user
    login: async(parent, {email, password}) => {
      const userLogin = await User.find({email})
      const token = signToken(userLogin)
      return {token, userLogin}
    }, 
    // add new user
    signup: async (parent, {input}) => {
      const newUser = await User.create(input)
      const token = signToken(newUser);
      return {token, newUser}
    }, 

    // add injury
    // remove injury
    // add friend


  }
};

module.exports = resolvers;
