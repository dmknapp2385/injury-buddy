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
        .populate({ path: 'friends' });
      return usersData;
    },
    // find all injuries
    injuries: async () => {
      const injuriesData = await Injury.find().select('-__v');
      return injuriesData;
    },

    // find injury by location
    injuryLocation: async (parent, { location }) => {
      const injuryData = await Injury.find({ location: { $in: location } });
      return injuryData;
    },

    // find user by id
    user: async (parent, { id }) => {
      const userData = await User.findById(id);
      return userData;
    }
  },
  Mutation: {
    //login user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    // add new user
    signup: async (parent, { input }) => {
      const newUser = await User.create(input);
      const token = signToken(newUser);
      return { token, newUser };
    },

    // add injury
    addInjury: async (parent, { input }, context) => {
      if (context.user) {
        const injury = await Injury.create(input);

        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { injuries: input._id} }, { new: true, runValidators: true}
        );
      }
      return updatedUser 
    }
    // remove injury, 
    // add friend
  }
};

module.exports = resolvers;
