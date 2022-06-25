//import models from db here
const { AuthenticationError, UserInputError } = require('apollo-server-express');
//import token for auth here
const { signToken } = require('../utils/auth.js');
const { User, Injury} = require('../models')

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .populate({
                    path: 'injuries', 
                })
                return userData

                t
            }
            throw new AuthenticationError('Not Logged in')
        }
    }, 

    Mutation: {

    }
};

module.exports = resolvers;
