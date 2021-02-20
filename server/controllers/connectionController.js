const ObjectId = require("mongoose").Types.ObjectId;
const { User } = require("../models");
const db = require("../models");

module.exports = {
  // Activated when I want to follow a user, which shows their account under my "following" property
  followUser: function (req, res) {
    if (req) {
      db.User.findOneAndUpdate(
        { _id: req.body.myId },
        { $push: { following: new ObjectId(req.body.theirId) } }
      )
        .then((cnxn) => {
          res.json(cnxn);
        })
        .catch((err) => {
          res.status(422).json(err);
        });
    }
  },

  // Automatically called on the client side right after followUser, showing me as a follower of the given user
  followerAdd: function (req, res) {
    db.User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { followers: new ObjectId(req.user._id) } }
    )
      .then((cnxn) => {
        res.json(cnxn);
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },

  // WIP fn for future development
  // unFollow: function(req, res) {
  //     console.log("req.user: ", req.user),
  //     console.log("req.params: ", req.params)
  //     db.User.findOneAndUpdate({ _id: req.user._id },
  //       { $pull: { following: { id: ObjectId(req.params.id) } } })
  //       .then((dbList) =>
  //         res.json(dbList))
  //       .catch(err => res.status(422).json(err));
  //   },
};
