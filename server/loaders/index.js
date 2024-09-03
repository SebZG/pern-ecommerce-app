const expressLoader = require("./express");

module.exports = async (app) => {

   // Load Express middleware
   const expressApp = await expressLoader(app);

   // Error handler
   app.use((err, req, res, next) => {

      const { message, status } = err;

      return res.status(status).send({ message });
   });
}