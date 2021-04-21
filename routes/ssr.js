const data = require("../data/portofolio.json")

async function routes(fastify, options) {
    fastify.get("/portfolio.html", async (request, reply) => {
        reply.view('/public/portfolio.ejs', data)
    })
  }
  
  module.exports = routes