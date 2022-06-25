//import models from db here
const { AuthenticationError } = require('apollo-server-express');
//import token for auth here
const { signToken } = require('../utils/auth.js');
const { User, Injury } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate('injuries')
          .populate('friends');
        return userData;
      }
      throw new AuthenticationError('Not Logged in');
    },
    users: async () => {
      const usersData = await User.find()
        .populate({ path: 'injuries' })
        .populate({ path: 'friends'});
      return (usersData);
    },
    injuries: async () => {
      const injuriesData = await Injury.find().select('-__v');
      return injuriesData;
    }
  }
};

module.exports = resolvers;
