const { BasicMessage } = require("../schema");
const argon2 = require("argon2");

async function routes(fastify, options) {
  fastify.post(
    "/signup",
    {
      schema: {
        tags: ["Auth"],
        response: {
          "2xx": {
            type: "object",
            properties: { token: { type: "string" } },
            description: "Successful signup",
          },
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
        body: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
          description: "Successful login",
        },
      },
    },
    async (req, reply) => {
      try {
        const { email, password } = req.body;
        const hashedPassword = await argon2.hash(password);
        const { rows } = await fastify.pg.query(
          ` INSERT INTO user_auth (email, hashed_password)
            VALUES 
                ($1, $2)
            RETURNING email;`,
          [email, hashedPassword]
        );
        return { token: fastify.jwt.sign(rows[0]) };
      } catch (err) {
        return err;
      }
    }
  );

  fastify.post(
    "/login",
    {
      schema: {
        tags: ["Auth"],
        response: {
          "2xx": {
            type: "object",
            properties: { token: { type: "string" } },
            description: "Successful login",
          },
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
        body: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
          description: "Successful login",
        },
      },
    },
    async (req, reply) => {
      try {
        const { email, password } = req.body;

        const {
          rows,
        } = await fastify.pg.query(
          ` SELECT hashed_password FROM user_auth WHERE email=$1; `,
          [email]
        );

        if (rows.length === 0) throw Error("Email tidak terdaftar");

        const isMatch = await argon2.verify(rows[0].hashed_password, password);
        if (!isMatch) throw Error("Password salah");

        return { token: fastify.jwt.sign({ email }) };
      } catch (err) {
        return err;
      }
    }
  );
}

module.exports = routes;

//ver3
/*const { BasicMessage } = require("../schema");

async function routes(fastify, options) {
  fastify.post(
    "/signup",
    {
      schema: {
        tags: ["Auth"],
        response: {
          "2xx": {
            type: "object",
            properties: { token: { type: "string" } },
            description: "Successful signup",
          },
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
        body: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
          description: "Successful login",
        },
      },
    },
    async (req, reply) => {
      try {
        const { email, password } = req.body;
        const { rows } = await fastify.pg.query(
          ` INSERT INTO user_auth (email, hashed_password)
            VALUES 
                ($1, $2)
            RETURNING email;`,
          [email, password]
        );
        return { token: fastify.jwt.sign(rows[0]) };
      } catch (err) {
        return err;
      }
    }
  );

  fastify.post(
    "/login",
    {
      schema: {
        tags: ["Auth"],
        response: {
          "2xx": {
            type: "object",
            properties: { token: { type: "string" } },
            description: "Successful login",
          },
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
        body: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
          description: "Successful login",
        },
      },
    },
    async (req, reply) => {
      try {
        const { email, password } = req.body;

        const {
          rows,
        } = await fastify.pg.query(
          ` SELECT hashed_password FROM user_auth WHERE email=$1; `,
          [email]
        );

        if (rows.length === 0) throw Error("Email tidak terdaftar");
        if (password !== rows[0].hashed_password) throw Error("Password salah");

        return { token: fastify.jwt.sign({ email }) };
      } catch (err) {
        return err;
      }
    }
  );
}

module.exports = routes;
*/

//ver2------------------------
// const { BasicMessage } = require("../schema");

// async function routes(fastify, options) {
  
//   fastify.post(
//     "/login",
//     {
//       schema: {
//         tags: ["Auth"],
//         response: {
//           "2xx": { 
//             type: "object",
//             properties: {token:{type: "string"}}, 
//             description: "Successful login"
//         },
//           "5xx": { ...BasicMessage, description: "Failed response" },
//         },
//         body: { 
//             type: "object",
//             properties: {
//                 email: {type: "string"},
//                 password: {type: "string"},
//             }, 
//             description: "Successful login"
//         },
//       },
//     },
//     async (req, reply) => {
//       try {
//         const {email, password} = req.body;
//         if(email!=='admin@adming.com')throw Error ("woe, anda bukan admiN!");
//         // const returnVal = await fastify.pg.query(
//         //   ` INSERT INTO coba (filter, imgSrc, title, summary, galleryHref, galleryTitle)
//         //     VALUES 
//         //         ($1, $2, $3, $4, $5, $6)
//         //     RETURNING id ;`,
//         //   [filter, imgSrc, title, summary, galleryHref, galleryTitle]
//         // );
       
//         return { token: fastify.jwt.sign({email:"admin@admin.com"}) };
//       } catch (err) {
//         return err;
//       }
//     }
//   );
// }
// module.exports = routes;


//ver1-----------------------------

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