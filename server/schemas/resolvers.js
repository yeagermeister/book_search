const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
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
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hash });
      return user;
    },
    addSavedBook: async (parent, { book }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to save a book.');
      }
      const { authors, description, bookId, image, title } = book;
      const existingBook = await Book.findOne({ bookId });
      if (existingBook) {
        await User.findByIdAndUpdate(context.user.id, { $addToSet: { savedBooks: existingBook } });
        return User.findById(context.user.id).populate('savedBooks');
      }
      const newBook = await Book.create({ authors, description, bookId, image, title });
      await User.findByIdAndUpdate(context.user.id, { $addToSet: { savedBooks: newBook } });
      return User.findById(context.user.id).populate('savedBooks');
    },
    deleteSavedBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to delete a saved book.');
      }
      const user = await User.findById(context.user.id);
      await user.savedBooks.pull({ bookId });
      await user.save();
      return user.populate('savedBooks');
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid email or password.');
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new AuthenticationError('Invalid email or password.');
      }
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
      return { token };
    },
    // other mutations you want to define
  },
  User: {
    savedBooks: async (parent) => {
      const books = await Book.find({ _id: { $in: parent.savedBooks } });
      return books;
    },
  },
  // other resolvers you want to define
};
module.exports = resolvers;