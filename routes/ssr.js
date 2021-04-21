const data = require("../data/portofolio.json")

async function routes(fastify, options) {
    fastify.get("/portfolio.html", async (request, reply) => {
        const {rows}/*result ->kalo mau secara umum*/ = await fastify.pg.query("SELECT * FROM coba;", [])
        console.log(rows/*{result}*/)
        reply.view('/public/portfolio.ejs', data), {
            ...data,
            items: rows.map((el) => {
                return {
                    filter: el.filter,
                    imgSrc: el.imgsrc,
                    title: el.title,
                    summary: el.summary,
                    galleryHref: el.galleryHref,
                    gallerryTitle: el.gallerytitle

                }
            },
            ),
        }
    })
  }
  
  module.exports = routes