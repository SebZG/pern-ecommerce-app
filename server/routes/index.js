const authRouter = require("./auth");
const productRouter = require("./product");
const userRouter = require("./user");
const cartRouter = require("./router");
const orderRouter = require("./order");

module.exports = (app, passport) => {
   authRouter(app, passport);
   productRouter(app);
   userRouter(app);
   cartRouter(app);
   orderRouter(app);
}