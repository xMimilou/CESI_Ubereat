const express = require('express');
const router = express.Router();

const { PostsModel } = require('../models/postsModel');

router.get('/', (req, res) => {
  PostsModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
});
router.post('/', (req, res) => {
  const newRecord = new PostsModel({
    username: req.body.username,
    costumerAddress: req.body.costumerAddress,
    restaurantAdress: req.body.restaurantAdress,
    restaurantName: req.body.restaurantName,
    total_price: req.body.total_price,
    time_delivered: req.body.time_delivered,
    statusDeliver: req.body.statusDeliver,
    usernameLivreur: req.body.usernameLivreur
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error creating new data : ' + err);
  })
});


module.exports = router;