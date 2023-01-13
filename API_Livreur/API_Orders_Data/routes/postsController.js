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

router.put("/:_id/:delivername", (req, res) => {
  if (!req.body.status || !req.params.delivername) {
    return res.status(400).send({error: 'status field is required'});
  }
  const updateRecord = {
      "order.status": req.body.status,
      "delivery_person.deliver_username": req.params.delivername

  };

  PostsModel.findOneAndUpdate(
      { "_id": req.params._id},
      { $set: updateRecord },
      { new: true },
      (err, docs) => {
          if (err) {
            console.log("Update error : " + err);
            return res.status(500).send({error: 'Error updating data in the database'});
          }
          if (!docs) {
            return res.status(404).send({error: 'Data not found'});
          }
          res.send(docs);
      }
  )
});
module.exports = router;