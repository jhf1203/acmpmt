const ObjectId = require("mongoose").Types.ObjectId;
const { User } = require("../models");
const db = require("../models");

module.exports = {

    followUser: function (req, res) {
         console.log("req: ", req)
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
    }
}

    