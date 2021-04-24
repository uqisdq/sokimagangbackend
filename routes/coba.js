const { BasicId, BasicMessage, BasicItem } = require("../schema");

async function routes(fastify, options) {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["Profile"],
        response: {
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
      },
    },
    async (req, reply) => {
      try {
        const { rows: returnVal } = await fastify.pg.query(
          `SELECT * FROM coba;`,
          []
        );
        return returnVal;
      } catch (err) {
        return err;
      }
    }
  );
  fastify.post(
    "/",
    {
      schema: {
        tags: ["Profile"],
        response: {
          "2xx": { ...BasicMessage, description: "Successful items addition" },
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
        body: BasicItem,
      },
    },
    async (req, reply) => {
      try {
        const {
          filter,
          imgSrc,
          title,
          summary,
          galleryHref,
          galleryTitle,
        } = req.body;
        const returnVal = await fastify.pg.query(
          ` INSERT INTO coba (filter, imgSrc, title, summary, galleryHref, galleryTitle)
            VALUES 
                ($1, $2, $3, $4, $5, $6)
            RETURNING id ;`,
          [filter, imgSrc, title, summary, galleryHref, galleryTitle]
        );
        console.log(returnVal);
        return { message: "Sukses mang!" };
      } catch (err) {
        return err;
      }
    }
  );
  fastify.put(
    "/:id",
    {
      schema: {
        tags: ["Profile"],
        response: {
          "2xx": { ...BasicMessage, description: "Successful item uodate" },
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
        body: BasicItem,
        params: BasicId,
      },
    },
    async (req, reply) => {
      try {
        const {
          filter,
          imgSrc,
          title,
          summary,
          galleryHref,
          galleryTitle,
        } = req.body;
        const returnVal = await fastify.pg.query(
          ` UPDATE coba
            SET
                filter = $1, imgSrc = $2, title = $3, summary = $4, galleryHref = $5, galleryTitle = $6
            WHERE id = $7;`,
          [
            filter,
            imgSrc,
            title,
            summary,
            galleryHref,
            galleryTitle,
            req.params.id,
          ]
        );
        console.log(returnVal);
        return { message: "Sukses mang!" };
      } catch (err) {
        return err;
      }
    }
  );
  fastify.get(
    "/:id",
    {
      schema: { tags: ["Profile"], params: BasicId },
    },
    async (req, reply) => {
      const {
        rows: returnVal,
      } = await fastify.pg.query(`SELECT * FROM coba WHERE id=$1;`, [
        req.params.id,
      ]);
      return returnVal;
    }
  );
  fastify.delete(
    "/:id",
    {
      schema: {
        tags: ["Profile"],
        response: {
          "2xx": { ...BasicMessage, description: "Successful item deletion" },
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
        params: BasicId,
      },
    },
    async (req, reply) => {
      try {
        const returnVal = await fastify.pg.query(
          `DELETE FROM coba WHERE id=$1;`,
          [req.params.id]
        );
        return { message: `sukses menghapus ${returnVal.rowCount} item` };
      } catch (err) {
        return err;
      }
    }
  );
}
module.exports = routes;

// const {BasicId} = require(../schema)

// async function routes(fastify, options) {
//     fastify.get("/", async (req, reply) => {
//         const client = await fastify.pg.connect()
//         const {rows: returnVal} = await fastify.pg.query/*fastify.pg bisa diganti client*/(
//             `SELECT * FROM coba;`, 
//           [],
//         )
//         /*client.release()*/
//         return returnVal
//     })

//     fastify.get(
//         "/:id",
//         {
//         schema:{
//             params: BasicId,
//         }    
//         }
//             async(req,reply) =>{
//         const{
//             rows: returnVal,
//         } = await fastify.pg.query(`SELECT * FROM coba WHERE id=$1;`,
//         [
//             req.params.id,
//         ])
//     return returnVal
//         })
//     }

  
//   module.exports = routes