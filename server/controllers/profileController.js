const ObjectId = require("mongoose").Types.ObjectId;
const { User } = require("../models");
const db = require("../models");

// Defining methods for the profileController
module.exports = {
  findAll: function(req, res) {
    console.log("user.findall")
    if (req.user) {
      db.User
        .find({ _id: req.user._id })
        .populate({ path: "profile", options: { sort: { 'date': -1 } } })
        .then(users => {
          res.json({ profile: users[0].profile });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ profile: null });
    }
  },
  findById: function(req, res) {
    console.log("user findbyid")
    if (req.user) {
      db.User
        .find({ _id: req.user._id })
        .populate("profile")
        .then(users => {
          const book = users[0].profile.filter(b => b._id.toString() === req.params.id);
          res.json({ book: book[0] });
        })
        .catch(err => res.status(422).json(err));
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
  remove: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.user._id }, { $pull: { profile: new ObjectId(req.params.id) } }, { new: true })
      .then(() => {
        db.Book
          .findOneAndDelete({ _id: req.params.id })
          .then(dbBook => res.json(dbBook))
          .catch(err => res.status(422).json(err));
      });
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
    .then(dbUser => console.log("user!: ", dbUser))
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
          ...currentUser.queue
        ]
      }
    })
    .then(dbUser => res.json(dbUser))
    .then(dbUser => console.log("user!: ", dbUser))
    .catch(err => res.status(422).json(err))
    
  }
};
