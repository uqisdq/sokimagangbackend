module.exports = {
    options: {
      confKey: 'config', // optional, default: 'config'
      schema: {
        type: 'object',
        required: ['PORT','DATABASE_URL'],
        properties: {
          PORT: {
            type: 'string',
            //default: 3000 --> AKAN DISEDIAKAN SAMA CLOUD PROVIDER NANTI PADA TAHAP PRODUCTION
          },
          DARABASE_URL: {
            type: "string",
          }
        },
      },
      dotenv: {
        path: `${__dirname}/../.env`,
        debug: true
      },
    },
  }