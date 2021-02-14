const ObjectId = require("mongoose").Types.ObjectId;
const { User } = require("../models");
const db = require("../models");

// Defining methods for the profileController
module.exports = {
  // Finding all users
  findAll: function (req, res) {
    if (req.user) {
      db.User.find({})
        .then((users) => {
          res.json({ users });
        })
        .catch((err) => res.status(422).json(err));
    } else {
      return res.json({ profile: null });
    }
  },

  // Finding a specific user based off of their ID.
  findById: function (req, res) {
    if (req.user) {
      // Built in to not perform the action if "undefined" becomes the id due to the nature of components batch-loading
      if (req.params.id.length != 9) {
        db.User.findOne({ _id: req.params.id })
          .populate("followers")
          .populate("following")
          .then((result) => {
            res.json({ result });
          })
          .catch((err) => res.status(422).json(err));
      } else {
        // Retrieving the logged in user if params.id is undefined
        db.User.findOne({ _id: req.user._id })
          .populate("followers")
          .populate("following")
          .then((result) => {
            res.json({ result });
          })
          .catch((err) => res.status(422).json(err));
      }
    } else {
      return res.json({ book: null });
    }
  },

  // Adding an album to the user's queue
  updateQueue: async function (req, res) {
    const currentUser = await db.User.findById({ _id: req.params.id });
    const updateReq = await db.User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          queue: [
            {
              album: req.body.album,
              artist: req.body.artist,
              image: req.body.image,
              mbid: req.body.mbid,
              tags: req.body.tags,
              tracks: req.body.tracks,
              url: req.body.url,
            },
            ...currentUser.queue,
          ],
        },
      }
    )
      .then((dbUser) => res.json(dbUser))
      .then((dbUser) => console.log("user!"))
      .catch((err) => res.status(422).json(err));
  },

  // Adding an album to the user's recommendations
  updateRecs: async function (req, res) {
    const currentUser = await db.User.findById({ _id: req.params.id });
    const updateReq = await db.User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          recommended: [
            {
              album: req.body.album,
              artist: req.body.artist,
              image: req.body.image,
              mbid: req.body.mbid,
              tags: req.body.tags,
              tracks: req.body.tracks,
              url: req.body.url,
            },
            ...currentUser.recommended,
          ],
        },
      }
    )
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },

  // Removing an album from a user's queue
  removeFromQueue: function (req, res) {
    db.User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { queue: { _id: req.params.id } } }
    )
      .then((dbList) => res.json(dbList))
      .catch((err) => res.status(422).json(err));
  },

  // Removing an album from a user's recommendations
  removeFromRecs: function (req, res) {
    db.User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { recommended: { _id: req.params.id } } }
    )
      .then((dbList) => res.json(dbList))
      .catch((err) => res.status(422).json(err));
  },

  // Updating a user's profile picture
  updateImage: (req, res) => {
    const { image } = req.body;
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
