// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
fastify.decorate("env", require("env-schema")(require("./config/env")));
fastify.register(require("fastify-multipart"), { attachFieldsToBody: true })
/*
if (process.env.NODE_ENV !== 'production') //-->Nanit, di fase production, prot akan disediakan cloud provider
  require('dotenv').config(require("./config/env").options.dotenv)
*/

// Register core Plugins
//fastify.register(require('fastify-env'), require("./config/env").options)
/*
fastify.register(require('fastify-env'), {
  ...require("./config/env").options,
  dotenv: false,
})*/
fastify.register(require("fastify-postgres"), require("./config/postgres"))
fastify.register(require("fastify-swagger"), require("./config/swagger"))
fastify.register(require("fastify-static"), require("./config/static").public )
//fastify.register(require("fastify-helmet"), require("./config/helmet"))
fastify.register(require("point-of-view"), require("./config/view"))
fastify.register(require("fastify-cors"), require("./config/cors"))
fastify.register(require("fastify-jwt"), require("./config/jwt"))

fastify.decorate("authenticate", async function(req, reply) {
  try {
    //console.log(req.headers)
    await req.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
});


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
fastify.register(require("./routes/coba"), { prefix: "/api/coba" })
fastify.register(require("./routes/auth"), { prefix: "/api/auth" })
fastify.register(require("./routes/mail"), { prefix: "/api/mail" })
fastify.register(require("./routes/placeholder"), {
  prefix: "/api/placeholder",
})

// Run the server!
fastify.ready((err) => {
  if (err) throw err
  fastify.swagger()
})

const start = async () => {
  try {
    await fastify.listen(process.env.PORT, "0.0.0.0")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
