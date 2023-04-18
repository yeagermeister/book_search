const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    getUserById: async (parent, { id }) => {
      const user = await User.findById(id).populate('savedBooks');
      return user;
    },
    // other queries you want to define
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addSavedBook: async (_, { userId, book }, context) => {
      try {
        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
          throw new Error('User not found'); // Handle case when user is not found
        }

        // // Extract book details from input
        // const { bookId, authors, description, image, link, title } = book;

        // // Create a new book object
        // const newBook = [
        //   "bookId": bookId,
        //   authors,
        //   description,
        //   image,
        //   link,
        //   title
        // ];

        // Add the book to the savedBooks array of the user
        console.log(book);
        user.savedBooks.push(book);

        // Save the updated user object
        await user.save();

        return user; // Return the updated user object
      } catch (error) {
        throw new Error(`Failed to add book to user: ${error.message}`);
      }
    },
    deleteSavedBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to delete a saved book.');
      }
      const user = await User.findById(context.user.id);
      user.savedBooks.pull({ bookId });
      await user.save();
      return user.populate('savedBooks');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
  // User: {
  //   savedBooks: async (parent) => {
  //     const books = await User.find({ _id: { $in: parent.savedBooks } });
  //     return books;
  //   },
  // },
  // other resolvers you want to define
};
module.exports = resolvers;