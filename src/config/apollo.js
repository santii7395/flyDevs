const { ApolloServer, gql } = require('apollo-server-express');
const userController = require('../controllers/user-controller');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const typeDefs = gql`
  type User {
    id: ID!,
    userId: String!,
    name: String!,
    lastname: String!,
    age: Int!
  }    
  type Query {
    users(userId: String, name: String, lastname: String, age: String): [User],
    user(id: ID!): User,

  }
  type Mutation {
    createUser(userId: String!, name: String!, lastname: String!, age: Int!, password: String!): User,
    updateUser(id: ID!, name: String, lastname: String, age: Int): User,
    deleteUser(id: ID!) : Boolean
    login(userId: String!, password: String!): String
  }
`;
 
const resolvers = {
  Query: {
    users(parent, args, context, info) {
      for (const property in args){
        if (typeof args[property] === 'string'){
          console.log(args[property]);
          if (_.startsWith(args[property], '%') && _.endsWith(args[property], '%')){
            console.log(_.replace(args[property], /%/g, ''));
            args[property] = new RegExp(_.replace(args[property], /%/g, ''));
          }
        }
      }

      return userController.list(args).then(users => {
        return users;
      });
    },
    user(parent, args, context, info) {
      console.log(context);
      return userController.get(args.id).then(user => {
        return user;
      })
    },
  },
  Mutation: {
    createUser(parent, args, context, info) {
      console.log(args);
      const newPassword = bcrypt.hashSync(args.password, 10);
      return userController.create(args.userId, args.name, args.lastname, args.age, newPassword).then(user =>{
        return user;
      }).catch(error => {
        throw error;
      });
    },
    updateUser(parent, args, context, info) {
      return userController.update({ _id: args.id, name: args.name, lastname: args.lastname, age: args.age}).then(user =>{
        return user;
      }).catch(error => {
        throw error;
      });
    },
    deleteUser(parent, args, context, info){
      userController.deleteUser(args.id);
      return;
    },
    login(parent, args, context, info){

      return userController.list({ userId: args.userId }).then(users => {
        if (users && users.length !== 1){
          throw new Error('Login Invalido');
        }

        if (!bcrypt.compareSync(args.password, users[0].password)) {
          throw new Error('Login Invalido');
        }

        const token = jwt.sign({
          name: users[0].name,
          id: users[0].userId
        }, process.env.TOKEN_SECRET);

        return token;
      });
    }
  }
};
 
const server = new ApolloServer({ typeDefs, resolvers, 
    context: ({ req, res }) => { 
    const token = req.headers.authorization || '';
    if(token){
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      return { user };
    }
  }
});

module.exports = server;