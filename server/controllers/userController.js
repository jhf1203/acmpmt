const db = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;


// Defining methods for the userController
module.exports = {

  // Getting and retaining the info for the logged in user
  getUser: (req, res, next) => {
      if (req.user) {
        return res.json({ user: req.user });
      } else {
        return res.json({ user: null });
      }
  },

  // Registering a new user, creating the user object and ensuring it isn't a duplicate
  register: (req, res) => {
      const { firstName, lastName, username, password } = req.body;
      db.User.findOne({ 'username': username }, (err, userMatch) => {
          if (userMatch) {
              return res.json({
                  error: `Sorry, already a user with the username: ${username}`
              });
          }
          const newUser = new db.User({
              'firstName': firstName,
              'lastName': lastName,
              'username': username,
              'password': password,
              'joinDate': new Date(),
              'queue': [],
              'recommended': [],
              'followers': [
                new ObjectId("6021ecf19095520028151ca5")
              ],
              'following': [
                new ObjectId("6021ecf19095520028151ca5")
              ],
          });
          newUser.save((err, savedUser) => {
              if (err) return res.json(err);
              console.log("saveduser: ", savedUser)
              return res.json(savedUser);

          })
      });
  },

  // Logging the user out
  logout: (req, res) => {
      if (req.user) {
        req.session.destroy();
        res.clearCookie('connect.sid'); // clean up!
        return res.json({ msg: 'logging you out' });
      } else {
        return res.json({ msg: 'no user to log out!' });
      }
  },

  // Authentication
  auth: function(req, res, next) {
		next();
  },
  authenticate: (req, res) => {

		const user = JSON.parse(JSON.stringify(req.user)); // hack
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
	}
};