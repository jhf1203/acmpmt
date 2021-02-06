const ObjectId = require("mongoose").Types.ObjectId;
const { User } = require("../models");
const db = require("../models");

module.exports = {

    // FIX FOLLOWUSERFN, IT'S HAVING ME AS A FOLLOWER OF MYSELF INSTEAD OF A FOLLOWER OF THE ONE I JUST FOLLOWED

    getFollowers: function (req, res) {
        console.log("blahblah")
    },


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

    // followUser: async function(req, res) {
    //     console.log("req: ", req)
    //     const currentUser = await db.User.findById({ _id: req.params.id })
    //     const updateCnxn = await db.User.findByIdAndUpdate({ _id: req.params.id }, {
    //       $set: {
    //         following: [
    //           {
    //             userName:  req.body.userName,
    //             firstName: req.body.firstName,
    //             lastName: req.body.lastName,
    //             id: req.body.id,
    //             image: req.body.image,
    //           },
    //           ...currentUser.following
    //         ]
    //       }
    //     })
    //     .then(dbUser => res.json(dbUser))
    //     .catch(err => res.status(422).json(err))
        
    //   },

    

    // getFollowing: function (req, res) {
        
    // }

}

    