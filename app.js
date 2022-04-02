require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphQL/schema/index');
const graphQlResolvers = require('./graphQL/resolvers/index');
// const isAuth = require('./middleware/is-auth');
// const emailController = require('./helpers/email_controller')

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/graphql', graphqlHTTP({ 
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true,
  formatError: (err) => {
      return err.message
  }
}));


// This is the endpoint that is hit from the onSubmit handler in Landing.js
// The callback is shelled off to a controller file to keep this file light.
// app.post('/email', emailController.collectEmail)

// Same as above, but this is the endpoint pinged in the componentDidMount of 
// Confirm.js on the client.
// app.get('/email/confirm/:id', emailController.confirmEmail)

  mongoose.connect(
    `mongodb+srv://mtamaioa:mtamaioa@clusterdisertatie.vsinc.mongodb.net/disertatie?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(8000);
    })
    .catch(err => {
        console.log(err);
    });

