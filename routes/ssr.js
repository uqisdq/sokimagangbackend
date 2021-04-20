async function routes(fastify, options) {
    fastify.get("/portfolio.html", async (request, reply) => {
        reply.view('/public/portfolio.ejs', 
        {
        desc: 'Holy Shoot Motherfricker',        
    })
    })
  }
  
  module.exports = routes