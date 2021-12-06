const usersResolver = {
    Query: {
        userDetailById: (_, { userId }, { dataSources, userIdToken }) => {
            console.log(userId);
            if(userId == userIdToken)
                return dataSources.authAPI.getUser(userId);
            else
                return null;
        },
    },
    Mutation: {
        signUpUser: async(_, { userInput }, { dataSources }) => {

            const authInput = {
                username: userInput.username,
                password: userInput.password,
                name: userInput.name,
                lastName: userInput.lastName,
                email: userInput.email,
                address: userInput.address,
            };

            return await dataSources.authAPI.createUser(authInput);
        },

        logIn: async(_, { credentials }, { dataSources }) => {
            return await dataSources.authAPI.authRequest(credentials);
        },

        refreshToken: async(_, { refresh }, { dataSources }) => {
            return await dataSources.authAPI.refreshToken(refresh);
        }

    }
};

module.exports = usersResolver;