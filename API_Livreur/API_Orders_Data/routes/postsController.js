const express = require('express');
const router = express.Router();

const { PostsModel } = require('../models/postsModel');

router.get('/', (req, res) => {
  PostsModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
});
router.put("/:_id/:delivername", (req, res) => {
  const updateRecord = {
      "order.status": req.body.status,
      "delivery_person.deliver_username": req.params.delivername

  };

  PostsModel.findOneAndUpdate(
      { "_id": req.params._id},
      { $set: updateRecord },
      { new: true },
      (err, docs) => {
          if (!err) res.send(docs);
          else console.log("Update error : " + err);
      }
  )
});
module.exports = router;