const express = require('express');
const router = express.Router();

const { PostsModel } = require('../models/postsModel');

router.get('/', (req, res) => {
  PostsModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
});
router.put("/:customer_username/:time_delivered", (req, res) => {
  const updateRecord = {
      "order.status": req.body.status
  };

  PostsModel.findOneAndUpdate(
      { "customer_username": req.params.customer_username, "order.time_delivered": req.params.time_delivered },
      { $set: updateRecord },
      { new: true },
      (err, docs) => {
          if (!err) res.send(docs);
          else console.log("Update error : " + err);
      }
  )
});
module.exports = router;