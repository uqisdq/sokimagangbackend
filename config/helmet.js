module.exports = (instance) => {
    return {
      contentSecurityPolicy: {
        directives: {
          ...require("fastify-helmet").contentSecurityPolicy.getDefaultDirectives(),
          "form-action": ["'self'"],
          "img-src": ["'self'", "data:", "validator.swagger.io"],
          "script-src": ["'self'"].concat(instance.swaggerCSP.script),
          "style-src": ["'self'", "https:"].concat(instance.swaggerCSP.style),
        },
      },
    };
  };