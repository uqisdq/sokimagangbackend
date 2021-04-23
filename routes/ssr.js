const data = require("../data/portofolio.json")

async function routes(fastify, options) {
    fastify.get("/portfolio.html", async (request, reply) => {
        const {rows}/*result ->kalo mau secara umum*/ = await fastify.pg.query("SELECT * FROM coba;", [])
        console.log(rows/*{result}*/)
        reply.view("/public/portfolio.ejs", {
            ...data,
            items: rows.map((row) => {
                return {
                    filter: row.filter,
                    imgSrc: row.imgsrc,
                    title: row.title,
                    summary: row.summary,
                    galleryHref: row.galleryhref,
                    gallerryTitle: row.gallerytitle

                }
            }),
        })
    })
}
  
  module.exports = routes