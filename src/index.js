require('dotenv').config();
const fastify = require('fastify')({ logger: process.env.NODE_ENV === 'development' });
const movies = require('./api/movies');
const dbConnector = require('./db-connector');

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err, promise);
});

fastify.register(dbConnector, {
  url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/fastify-test`,
});

fastify.register(movies);

const main = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

main();
