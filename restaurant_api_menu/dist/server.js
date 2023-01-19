"use strict";
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3002;
const articleRoutes = require('./routes/article');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');
const restaurantRoutes = require('./routes/restaurant');
app.use(cors());
app.use(express.json());
app.use('/restorer/articles', articleRoutes);
app.use('/restorer/menus', menuRoutes);
app.use('/restorer/orders', orderRoutes);
app.use('/restorer/restaurants', restaurantRoutes);
app.get("/", (req, res, next) => {
    res.send("This is the beginning of a new journey.");
});
app.use(function (req, res, next) {
    res.status(404).send("Sorry, that route does not exist. Try again.");
});
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
