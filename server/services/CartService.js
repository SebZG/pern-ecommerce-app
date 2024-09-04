const createError = require("http-errors");
const CartModel = require("../models/cart");
const CartItemModel = require("../models/cartItem");
// TODO: Add OrderModel

module.exports = class CartService {

   async create(data) {

      const { userId } = data;

      try {

         // Instantiate a new cart and save
         const Cart = new CartModel();
         const cart = await Cart.create(userId);

         return cart;

      } catch (err) {
         throw err;
      }
   }

   async loadCart(userId) {

      try {

         // Load user cart based on ID
         const cart = await CartModel.findOneByUser(userId);

         // Load cart items and add them to the cart record
         const items = await CartItemModel.find(cart.id);
         cart.items = items;

         return cart;

      } catch (err) {
         throw err;
      }
   }

   async addItem(userId, item) {

      try {

         // Load user cart based on ID
         const cart = await CartModel.findOneByUser(userId);

         // Create cart item
         const cartItem = await CartItemModel.create({ cartId: cart.id, ...item });

         return cartItem;

      } catch (err) {
         throw err;
      }
   }

   async updateItem(cartItemId, data) {

      try {

         // Update cart item by line ID
         const cartItem = await CartItemModel.update(cartItemId, data);

         return cartItem;

      } catch (err) {
         throw err;
      }
   }

   async removeItem(cartItemId) {

      try {

         // Remove cart item by line ID
         const cartItem = await CartItemModel.delete(cartItemId);

         return cartItem;

      } catch (err) {
         throw err;
      }
   }

   // TODO: Add checkout()
}