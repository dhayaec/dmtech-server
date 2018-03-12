const httpErrors = require('http-errors');
const movieRepository = require('../repository/movie-repository');

async function routes(fastify) {
  const db = fastify.mongo.db('fastify-test');

  fastify.get('/movies', async (req, reply) => {
    const result = await movieRepository(db).getAllMovies();
    reply.code(200).send(result);
  });

  fastify.get('/movies/premieres', async (req, reply) => {
    const result = await movieRepository(db).getMoviePremiers();
    reply.code(200).send(result);
  });

  fastify.get('/movies/:id', async (req, reply) => {
    const { params: { id } } = req;
    const result = await movieRepository(db).getMovieById(id);
    if (result === null) {
      reply.send(httpErrors.NotFound());
    } else {
      reply.code(200).send(result);
    }
  });
}

module.exports = routes;

