require('dotenv').config();

const app = require('./src/config/express');
const server = require('./src/config/apollo');
require('./src/config/mongo');


server.applyMiddleware({ app });
 
app.listen({ port: process.env.SERVER_PORT }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);