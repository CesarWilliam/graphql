const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers.js');
const mongoose = require('mongoose');
const cors = require("cors");

async function startServer() {
    const app = express();
    app.use(cors());
    const apolloServer = new ApolloServer({
        typeDefs, resolvers
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app });

    app.use((req, res) => {
        res.send('Hello from express apollo server');
    });

    await mongoose.connect('mongodb://localhost:2717/portcripto', {
        keepAlive: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log('Mongoose connected...');

    app.listen({ port: 4000 }, () =>
        console.log('Now browse to http://localhost:4000' + apolloServer.graphqlPath)
    );
}
startServer(); 