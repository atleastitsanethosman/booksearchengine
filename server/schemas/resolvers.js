const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('savedBooks');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  Mutation: {
    addUser: async (parent, { body }) => {
        const user = await User.create(body);
        const token = signToken(user);
        return { token, user };
      },  
    login: async (parent, { body }) => {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

        if (!user) {
            throw new AuthenticationError("Can't find this user!");
        }

        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);

        return { token, user };
      },
    saveBook: async (parent, {body}, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
          );
        }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { params }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: params.bookId } } },
          { new: true }
          );
        }
      throw new AuthenticationError('You need to be logged in!'); 
    }
  }
};

module.exports = resolvers;
