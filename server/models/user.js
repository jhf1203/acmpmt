const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({

	firstName: { 
		type: String, 
		unique: false 
	},

	lastName: { 
		type: String, 
		unique: false 
	},

	username: { 
		type: String, 
		unique: false, 
		required: false 
	},

	password: { 
		type: String, 
		unique: false, 
		required: false 
	},

	image: {
		type: String,
		default: "https://via.placeholder.com/300"
	},

	joinDate: {
		type: Date,
		default: () => new Date(),
	  },

  	queue: [
		{
			album: {type: String},
			artist: {type: String},
			image: {type: String},
			url: {type: String},
			tags: [],
			tracks: [],
			mbid: {type: String},
		}
	  ],

  recommended: [
    {
		album: {type: String},
		artist: {type: String},
		image: {type: String},
		url: {type: String},
		tags: [],
		tracks: [],
		mbid: {type: String},
    }
  ],

  followers: [
    {
      type: Schema.Types.ObjectId,
	  ref: "User",
    }
  ],

  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
};

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.password) {
		// console.log('No password provided!');
		next();
	} else {
		this.password = this.hashPassword(this.password);
		next();
	}
})

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
