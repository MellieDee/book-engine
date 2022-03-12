const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')


//pass parent as  placeholder parameter.  won't be used, but  need something in 1st param spot para so can access username arg from 2nd param.
//then pass that obj var to fund()
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },


    // -----------  ALL Users  ----------------
    users: async () => {
      return User.find()
        .select('-__v -password')
    },

    //   ----------- ONE User  -----------------
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
    }
  },



  //  ***************************  MUTATIONS ******************************
  //Mongoose User model creates new user in DB w/ whatever is passed as args.

  //  ------------------- ADD user Starts ----------------------
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    //  ------------------- LOGIN user Starts -------------------
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user)
      return { token, user };
    },


    deleteUser: async (parent, args, context) => {

      return User.findOneAndDelete(
        { _id: context.user._id }
      )
    },


    // -------------------SAVE Book Starts  ------------------------
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {

        console.log(bookData)

        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true } //Mongo would return old doc w/o "new"
        );
        return updatedUser
      }
      throw new AuthenticationError('You need to be logged in!');
    },



    // ----------------  DELETE Book Starts -----------------
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user_id },
          { $pull: { savedBooks: bookId } },
          { new: true }
        );
        return updatedUser
      };
      throw new AuthenticationError('You need to be logged in!');
    }
  }

}



module.exports = resolvers;