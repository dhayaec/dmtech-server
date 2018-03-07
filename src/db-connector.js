const fastifyPlugin = require('fastify-plugin');
const { MongoClient } = require('mongodb');

async function dbConnector(fastify, options) {
  const { url } = options;
  const db = await MongoClient.connect(url, { uri_decode_auth: true });

  fastify.decorate('mongo', db);
}

module.exports = fastifyPlugin(dbConnector);
