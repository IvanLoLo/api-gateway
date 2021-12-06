const { gql } = require("apollo-server");

const manageTypeDefs = gql`
    type Delivery {
        id: String!
        usernameEmisor: String!
        usernameReceptor: String!
        ciudadOrigen: String!
        ciudadDestino: String!
        direccionOrigen: String!
        direccionDestino: String!
        value: Int!
        description: String
        estado: String!
        pickUpDate: String
        deliverDate: String
        pqr: String
    }

    input DeliveryInput {
        id: String
        usernameEmisor: String!
        usernameReceptor: String!
        ciudadOrigen: String!
        ciudadDestino: String!
        direccionOrigen: String!
        direccionDestino: String!
        value: Int
        description: String
        estado: String
        pickUpDate: String
        deliverDate: String
        pqr: String
    }

    extend type Query {
        allDeliveries(cosa: String): [Delivery]
        deliveriesByUsername(username: String!, filter: String): [Delivery]
        deliveryById(deliveryId: String!): Delivery
    }

    extend type Mutation {
        createDelivery(delivery: DeliveryInput!): Delivery
        editDelivery(delivery: DeliveryInput!): Delivery
        deleteDelivery(deliveryId: String!): String
    }

`;

module.exports = manageTypeDefs;