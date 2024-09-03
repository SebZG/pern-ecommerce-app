const createError = require("http-errors");
const UserModel = require("../models/user");
const UserModelInstance = new UserModel();

module.exports = class AuthService {

   async register(data) {

      const { email } = data;

      try {

         // Check if user already exists
         const user = await UserModelInstance.findOneByEmail(email);

         // If user already exists, reject
         if (user) {
            throw createError(400, "User already exists");
         }

         // Create new user if doesn't exist
         return await UserModelInstance.create(data);

      } catch (err) {
         throw createError(500, err);
      }
   }

   async login(data) {

      const { email, password } = data;

      try {

         // Check if user exists
         const user = await UserModelInstance.findOneByEmail(email);

         // If user doesn't exist, reject
         if (!user) {
            throw createError(401, "Incorrect email or password");
         }

         // Check for matching passwords
         if (user.password !== password) {
            throw createError(401, "Incorrect email or password");
         }

         return user;

      } catch (err) {
         throw createError(500, err);
      }
   }
}