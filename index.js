// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Register Plugins
fastify.register(require('fastify-static'), require("./config/static").public)

fastify.register(require('fastify-static'), require("./config/static").assets)

fastify.register(require('fastify-static'), require("./config/static").forms)

// Declare a route
fastify.get('/', async (request, reply) => {
  /*return*/ reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'index.html') directly
})

// Declare a route
fastify.get('/apaya', async (request, reply) => {
  return { hello: 'apaya' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT, "0.0.0.0")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
