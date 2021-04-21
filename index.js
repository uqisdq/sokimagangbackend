// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

if (process.env.NODE_ENV !== 'production') //-->Nanit, di fase production, prot akan disediakan cloud provider
  require('dotenv').config(require("./config/env").options.dotenv)

// Register Plugins
//fastify.register(require('fastify-env'), require("./config/env").options)

fastify.register(require('fastify-env'), {
  ...require("./config/env").options,
  dotenv: false,
})

fastify.register(require('fastify-static'), require("./config/static").public)
fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  }
})

//fastify.register(require('fastify-static'), require("./config/static").assets)

//fastify.register(require('fastify-static'), require("./config/static").forms)

//Declare a route
//fastify.get('/', async (request, reply) => {
//  /*return*/ reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'index.html') directly
//})

//Declare a route
//fastify.get('/apaya', async (request, reply) => {
//  return { hello: 'apaya' }
//})

fastify.register(require("./routes/route"))
fastify.register(require("./routes/ssr"))

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
