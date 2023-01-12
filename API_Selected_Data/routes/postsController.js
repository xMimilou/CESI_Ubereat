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
    order_id: req.body.order_id,
    user_id: req.body.user_id,
    order_time: req.body.order_time,
    address: req.body.address,
    quantity: req.body.quantity,
    total_price: req.body.total_price
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error creating new data : ' + err);
  })
});

module.exports = router;