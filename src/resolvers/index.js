const authResolver = require("./auth_resolver");
const deliveryResolver = require("./delivery_resolver");

const lodash = require("lodash");

const resolvers = lodash.merge(authResolver, deliveryResolver);

module.exports = resolvers;