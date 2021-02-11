const ObjectId = require("mongoose").Types.ObjectId;
const { User } = require("../models");
const db = require("../models");

// Defining methods for the profileController
module.exports = {
  
  findAll: function(req, res) {
    if (req.user) {
      db.User
        .find({})
        .then(users => {
          res.json({ users });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ profile: null });
    }
  },

  findById: function(req, res) {
    if (req.user) {
      if (req.params.id.length != 9) {
        db.User
          .findOne({ _id: req.params.id })
          .populate("followers")
          .populate("following")
          .then(result => {
            res.json({ result });
          })
          .catch(err => res.status(422).json(err));
      } else {
      db.User
        .findOne({ _id: req.user._id })
        .populate("followers")
        .populate("following")
        .then(result => {
          res.json({ result });
        })
        .catch(err => res.status(422).json(err));
      }
    } else {
      return res.json({ book: null });
    }
  },

  create: function(req, res) {
    db.Album
      .create(req.body)
      .then(dbBook => {
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { profile: dbBook._id } }, { new: true });
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },

  update: function(req, res) {
    db.Album
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  updateQueue: async function(req, res) {
    const currentUser = await db.User.findById({ _id: req.params.id })
    const updateReq = await db.User.findByIdAndUpdate({ _id: req.params.id }, {
      $set: {
        queue: [
          {
            album:  req.body.album,
            artist: req.body.artist,
            image: req.body.image,
            mbid: req.body.mbid,
            tags: req.body.tags,
            tracks: req.body.tracks,
            url: req.body.url
          },
          ...currentUser.queue
        ]
      }
    })
    .then(dbUser => res.json(dbUser))
    .then(dbUser => console.log("user!"))
    .catch(err => res.status(422).json(err))
    
  },
  updateRecs: async function(req, res) {
    const currentUser = await db.User.findById({ _id: req.params.id })
    const updateReq = await db.User.findByIdAndUpdate({ _id: req.params.id }, {
      $set: {
        recommended: [
          {
            album:  req.body.album,
            artist: req.body.artist,
            image: req.body.image,
            mbid: req.body.mbid,
            tags: req.body.tags,
            tracks: req.body.tracks,
            url: req.body.url
          },
          ...currentUser.recommended
        ]
      }
    })
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err))
    
  },

  // addToQueue: function(req, res) {
  //   console.log("user: ", req.user)
  //   console.log("params: ", req.params)
  //   console.log("body: ", req.body)
  //   db.User.findOneAndUpdate({ _id: req.user._id }, 
  //     { $push: { queue: { 
  //         album:  req.body.album,
  //         artist: req.body.artist,
  //         image: req.body.image,
  //         mbid: req.body.mbid,
  //         tags: req.body.tags,
  //         tracks: req.body.tracks,
  //         url: req.body.url } } })
  //     .then((dbList) => 
  //       res.json(dbList))
  //     .catch(err => res.status(422).json(err));
  // },

  removeFromQueue: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.user._id }, 
      { $pull: { queue: { _id: req.params.id } } })
      .then((dbList) => 
        res.json(dbList))
      .catch(err => res.status(422).json(err));
  },

  removeFromRecs: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.user._id }, 
      { $pull: { recommended: { _id: req.params.id } } })
      .then((dbList) => 
        res.json(dbList))
      .catch(err => res.status(422).json(err));
  },

  updateImage: (req, res) => {
    const { image } = req.body;
    db.User.findOneAndUpdate({
      _id: req.params.id
    }, req.body, { new: true }
    ).then(dbModel => res.json(dbModel)
    ).catch(err => res.status(422).json(err));
  }
};
