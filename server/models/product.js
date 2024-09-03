const db = require("../db");

module.exports = class ProductModel {

   /**
    * List products
    * @param  {Object} options [Query options]
    * @return {Array}          [Array of products]
    */

   async find(options = {}) {

      try {

         const statement = `SELECT *
                            FROM products`;
         const values = [];

         // Apply filtering
         if (options.filter) {
            statement += ` WHERE name = ${options.filter}`;
         }

         // Apply sorting
         if (options.sort) {
            statement += ` ORDER BY price ${options.filter}`;
         }

         // Apply pagination
         if (options.limit && options.offset) {
            statement += ` LIMIT ${options.limit} OFFSET ${options.offset}`;
         }

         const result = await db.query(statement, values);

         if (result.rows?.length) {
            return result.rows[0];
         }

         return [];

      } catch (err) {
         throw err;
      }
   }

   /**
    * Retrieve product by ID
    * @param  {Object}      id [Product ID]
    * @return {Object}         [Product record]
    */

   async findOne(id) {

      try {

         const statement = `SELECT *
                            FROM products
                            WHERE id = $1`;
         const values = [id];

         const result = await db.query(statement, values);

         if (result.rows?.length) {
            return result.rows[0];
         }

         return null;

      } catch (err) {
         throw err;
      }
   }
}