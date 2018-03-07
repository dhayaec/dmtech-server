async function routes(fastify) {
  const database = fastify.mongo.db('db');
  const collection = database.collection('test');

  fastify.get('/', async () => ({ hello: 'world' }));

  fastify.get('/one', async () => ({ hello: 'one' }));

  fastify.get('/two', async () => ({ hello: 'two' }));

  fastify.get('/three', async () => ({ hello: 'three' }));

  fastify.get('/search/:id', async (request) => {
    const { params: { id } } = request;

    const result = await collection.findOne({ id });

    if (result.value === null) {
      throw new Error('Invalid value');
    }

    return result.value;
  });
}

module.exports = routes;

