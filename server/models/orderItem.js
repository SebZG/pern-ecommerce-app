const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: false });

module.exports = class OrderItemModel {

   constructor(data = {}) {
      this.created = data.created || moment.utc().toISOString();
      this.description = data.description;
      this.modified = moment.utc().toISOString();
      this.name = data.name;
      this.price = data.price || 0;
      this.productId = data.id;
      this.qty = data.qty || 1;
      this.orderId = data.orderId || null;
   }

   /**
    * Creates a new order item
    * @param  {Object}        data [Order item data]
    * @return {Object|null}        [Created order item]
    */

   static async create(data) {

      try {

         // Generate SQL statement - using helper for dynamic parameter injection
         const statement = pgp.helpers.insert(data, null, 'orderItems') + ' RETURNING *';

         // Execute SQL statement
         const result = await db.query(statement);

         if (result.rows?.length) {
            return result.rows[0];
         }

         return null;

      } catch (err) {
         throw new Error(err);
      }
   }

   /**
    * Retrieve order items for an order
    * @param  {Object} orderId [Order ID]
    * @return {Array}          [Created cart item]
    */

   static async find(orderId) {

      try {

         // Generate SQL statement
         const statement = `SELECT 
                              oi.id, 
                              oi.qty,
                              p.*
                            FROM orderItems AS oi
                            INNER JOIN products AS p ON p.id = oi.product_id
                            WHERE oi.order_id = $1`
         const values = [orderId];

         // Execute SQL statement
         const result = await db.query(statement, values);

         if (result.rows?.length) {
            return result.rows;
         }

         return [];

      } catch (err) {
         throw new Error(err);
      }
   }
}