const {User, Book} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        //Resolver to fetch the current user's data
        me: async(parent, args, context) => {
            
            const foundUser = context.user;
            //check if user is authenticated
            if (!foundUser){
                throw new AuthenticationError('You need to be logged in!');
            }
            //fetch and return user data excluding sensitive info
            const userData = await User.findOne({_id: foundUser._id}).select('-__v -password');
            return userData;
    },
    //Resolver to fetch all users
    users: async() => {
        //retrieve and return all users data excluding sensitive info
        return User.find().select('-__v -password');
    },

    //Resolver to fetch a single user by username
    user: async(parent, {username}) => {
        //retrieve and return a single user data excluding sensitive info
        return await User.findOne({username}).select('-__v -password');
    },

    //Resolver to fetch all books
    books: async(parent, {username}) => {
        //retrieve and return all books data
        const user = await User.findOne({username});
        return user.savedBooks;
    },
    },


Mutation: {
    //
        login: async(parent, {email, password}) => {
        const user = await User.findOne({email});

        if (!user){
            throw new AuthenticationError('Incorrect credentials');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw){
            throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user);
        return {token, user};
    },

    addUser: async(parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        return {token, user};
    },

    saveBook: async(parent, args, context) => {
        if (context.user){
            const updatedUser = await User.findByIdAndUpdate(
                {_id: context.user._id},
                {$push: {savedBooks: args}},
                {new: true, runValidators: true}
            );
            return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async(parent, args, context) => {
        if (context.user){
            const updatedUser = await User.findByIdAndUpdate(
                {_id: context.user._id},
                {$pull: {savedBooks: {bookId: args.bookId}}},
                {new: true}
            );
            return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
},
};


module.exports = resolvers;