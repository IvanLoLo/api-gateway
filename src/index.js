const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const AuthAPI = require("./dataSources/auth_api");
const ManageAPI = require("./dataSources/manage_api");
const authentication = require("./utils/authentication");

const server = new ApolloServer({
    context: authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        manageAPI: new ManageAPI(),
        authAPI: new AuthAPI(),
    }),
    introspection: true,
    playground: true
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log("Server running at "+url);
});
