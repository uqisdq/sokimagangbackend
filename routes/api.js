async function routes(fastify, options) {
    fastify.get("/sapa", async (request, reply) => {
      reply.send({ hello: request.query.nama || "anonymous" })
    })

    fastify.get("/table/create", async (req, reply) => {
        const client = await fastify.pg.connect()
        const returnVal = await client.query(
            `CREATE TABLE ${req.query.name} (
                ID int,
                LastName varchar(255),
                FirstName varchar(255),
                Address varchar(255),
                City varchar(255)
            );`, 
          [],
        )
        client.release()
        return returnVal
    })
}
  
  module.exports = routes