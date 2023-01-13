const express = require('express');
const router = express.Router();

const { PostsModel } = require('../models/postsModel');

router.get('/', (req, res) => {
  PostsModel.find((err, docs) => {
    if (!err) res.send(docs);
    else {
      console.log("Error to get data : " + err);
      res.status(500).send({error: 'Error getting data from the database'});
    }
  })
});

router.get('/:id', (req, res) => {
    PostsModel.findById(req.params.id, (err, docs) => {
      if (err) {
        console.log("Error getting data : " + err);
        return res.status(500).send({error: 'Error getting data from the database'});
      }
      if (!docs) {
        return res.status(404).send({error: 'Data not found'});
      }
      res.send(docs);
    });
});

router.post('/', (req, res) => {
  if (!req.body.username || !req.body.costumerAddress || !req.body.restaurantAdress || !req.body.restaurantName || !req.body.total_price || !req.body.time_delivered || !req.body.statusDeliver || !req.body.usernameLivreur) {
    return res.status(400).send({error: 'Username is required'});
  }
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

  PostsModel.create(newRecord, (err, docs) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(409).send({error: 'Data already exists'});
      }
      console.log('Error creating new data : ' + err);
      return res.status(500).send({error: 'Error saving data to the database'});
    }
    res.send(docs);
  });
});

module.exports = router;