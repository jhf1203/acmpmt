const ObjectId = require("mongoose").Types.ObjectId;
const { User } = require("../models");
const db = require("../models");

module.exports = {

    followUser: function (req, res) {
        if(req) {
        db.User
            .findOneAndUpdate({ _id: req.user.id }, 
                { $push: { following: new ObjectId(req.params.id) } })
                .then(cnxn => {
                    res.json(cnxn)
                })
                .catch(err => {res.status(422).json(err)})
            }
    },

    followerAdd: function (req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.id },
                { $push: { followers: new ObjectId(req.user.id) }
                })
                .then(cnxn => {
                    res.json(cnxn)
                })
                .catch(err => {res.status(422).json(err)})
    },

    unFollow: function(req, res) {
        console.log("req.user: ", req.user),
        console.log("req.params: ", req.params)
        db.User.findOneAndUpdate({ _id: req.user._id }, 
          { $pull: { following: { id: ObjectId(req.params.id) } } })
          .then((dbList) => 
            res.json(dbList))
          .catch(err => res.status(422).json(err));
      },
}

    