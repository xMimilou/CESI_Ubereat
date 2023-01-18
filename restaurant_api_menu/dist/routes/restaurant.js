"use strict";
const restaurantRouter = require('express').Router();
const { readRestaurant, createRestaurant, updateRestaurant, removeRestaurant } = require('../controllers');
// GET the list of orders
restaurantRouter.get('/', readRestaurant);
// POST an order
restaurantRouter.post('/', createRestaurant);
// UPDATE an order
restaurantRouter.put('/:id', updateRestaurant);
// DELETE an order
restaurantRouter.delete('/:id', removeRestaurant);
module.exports = restaurantRouter;
