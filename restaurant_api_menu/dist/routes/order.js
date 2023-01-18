"use strict";
const orderRouter = require('express').Router();
const { readOrders, createOrder, updateOrder, removeOrder, updateOrderStatus } = require('../controllers');
// GET the list of orders
orderRouter.get('/', readOrders);
// POST an order
orderRouter.post('/', createOrder);
// UPDATE an order
orderRouter.put('/:id', updateOrder);
// UPDATE an order status
orderRouter.put('/:id/status', updateOrderStatus);
// DELETE an order
orderRouter.delete('/:id', removeOrder);
module.exports = orderRouter;
