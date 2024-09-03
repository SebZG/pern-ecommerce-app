const authRouter = require("./auth");
const productRouter = require("./product");

module.exports = (app, passport) => {
   authRouter(app, passport);
   productRouter(app);
}