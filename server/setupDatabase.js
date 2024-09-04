const { Client } = require("pg");
const { DB } = require("./config");

(async () => {

   const usersTable = `
      CREATE TABLE IF NOT EXISTS users (
         id             INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
         email          VARCHAR(50),
         password       TEXT,
         first_name     VARCHAR(50),
         last_name      VARCHAR(50),
         google         JSON,
         facebook       JSON,
         created        DATE,
         modified       DATE
      )
   `

   const ordersTable = `
      CREATE TABLE IF NOT EXISTS orders (
         id             INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NO NULL,
         total          INT               NOT NULL,
         status         VARCHAR(50)       NOT NULL,
         user_id        INT               NOT NULL,
         FOREIGN KEY (user_id) REFERENCES users(id),
         created        DATE              NOT NULL,
         modified       DATE              NOT NULL
   )
   `

   const productsTable = `
      CREATE TABLE IF NOT EXISTS products (
         id             INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NO NULL,
         name           VARCHAR(50)       NOT NULL,
         price          BIGINT            NOT NULL,
         description    VARCHAR(50)       NOT NULL,
         created        DATE              NOT NULL,
         modified       DATE              NOT NULL
      )
   `

   const cartsTable = `
      CREATE TABLE IF NOT EXISTS carts (
         id             INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NO NULL,
         user_id        INT               NOT NULL,
         FOREIGN KEY (user_id) REFERENCES users(id),
         created        DATE              NOT NULL,
         modified       DATE              NOT NULL
      )
   `

   const orderItemsTable = `
      CREATE TABLE IF NOT EXISTS orderItems (
         id             INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NO NULL,
         name           VARCHAR(50)       NOT NULL,
         qty            INT               NOT NULL 
         price          INT               NOT NULL,
         description    VARCHAR(50)       NOT NULL,
         order_id       INT               NOT NULL,
         product_id     INT               NOT NULL,
         FOREIGN KEY (order_id) REFERENCES orders(id),
         FOREIGN KEY (product_id) REFERENCES products(id),
         created        DATE              NOT NULL,
         modified       DATE              NOT NULL
      )
   `

   const cartItemsTable = `
      CREATE TABLE IF NOT EXISTS cartItems (
         id             INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NO NULL,
         qty            INT               NOT NULL,
         product_id     INT               NOT NULL,
         cart_id        INT               NOT NULL,
         FOREIGN KEY (product_id) REFERENCES products(id),
         FOREIGN KEY (cart_id) REFERENCES carts(id),
         created        DATE              NOT NULL,
         modified       DATE              NOT NULL         
      )
   `

   try {
      const db = new Client({
         user: DB.PGUSER,
         host: DB.PGHOST,
         database: DB.PGDATABASE,
         password: DB.PGPASSWORD,
         port: DB.PGPORT
      });

      await db.connect();

      // Create tables on database
      await db.query(usersTable);
      await db.query(ordersTable);
      await db.query(productsTable);
      await db.query(cartsTable);
      await db.query(orderItemsTable);
      await db.query(cartItemsTable);

      await db.end();

   } catch (err) {
      console.log(`ERROR CREATING ONE OR MORE TABLES: ${err}`);
   }

})();