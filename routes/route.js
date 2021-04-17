
async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    reply.sendFile("index.html")
  })

  fastify.get("/sapa", async (request, reply) => {

    reply.send({ hello: request.query.nama || "anonymous" })
  })
}




