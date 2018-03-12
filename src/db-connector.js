const fastifyPlugin = require('fastify-plugin');
const { MongoClient } = require('mongodb');

async function dbConnector(fastify, options) {
  const { url } = options;
  const db = await MongoClient.connect(url);

  fastify.decorate('mongo', db);
}

module.exports = fastifyPlugin(dbConnector);
