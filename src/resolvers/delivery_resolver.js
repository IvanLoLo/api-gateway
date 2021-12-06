const deliveryResolver = {
    Query: {

        allDeliveries: async(_, { cosa }, { dataSources, userIdToken }) => {
            if(userIdToken != 1) return null
            return await dataSources.manageAPI.getAllDeliveries();
        },

        deliveriesByUsername: async(_, { username, filter }, { dataSources, userIdToken }) => {
            console.log("ACA ESTA "+userIdToken);
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            console.log(usernameToken);
            if(username == usernameToken)
                return await dataSources.manageAPI.getDeliveries(username, filter);
            else
                return null;
        },

        deliveryById: async(_, { deliveryId }, { dataSources }) => {
            //usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            //Revisar que el pedido si pertenezca al usuario
            return await dataSources.manageAPI.getDelivery(deliveryId);
        },
    },

    Mutation: {
        createDelivery: async(_, { delivery }, { dataSources, userIdToken }) => {
            console.log("A crear un nuevo domicilio");
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if(delivery.usernameEmisor == usernameToken){
                delivery.value = (Math.floor(Math.random() * (2500 - 100)) + 100) * 100;
                delivery.estado = "Por recoger";
                console.log("Valor del envio: "+delivery.value);
                return await dataSources.manageAPI.createDelivery(delivery);
            }else
                return null;
        },

        editDelivery: async(_, { delivery }, { dataSources, userIdToken }) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if(delivery.usernameEmisor == usernameToken || userIdToken == 1)
                return await dataSources.manageAPI.editDelivery(delivery);
            else
                return null;
        },

        deleteDelivery: async(_, { deliveryId }, { dataSources, userIdToken }) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            let pedido = await dataSources.manageAPI.getDelivery(deliveryId);
            console.log(pedido.usernameEmisor+" vs "+usernameToken);
            if(pedido.usernameEmisor == usernameToken)//delivery.usernameEmisor == usernameToken)
                return await dataSources.manageAPI.deleteDelivery(deliveryId);
            else
                return null;
        },
    }
};

module.exports = deliveryResolver;