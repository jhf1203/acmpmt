const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define userSchema
const albumSchema = new Schema({
	albumName: { type: String, 
		unique: false },

	albumArtist: { type: String, 
		unique: false },

	albumArt: { type: String, 
		unique: false, 
		required: false },

	albumURI: { type: String, 
		unique: false, 
		required: false },

	albumTags: [{
		name: {type: String,
		unique: false,
		required: false},

		value: {type: Number,
		unique: false,
		required: false}
	}
	]
		
});




// Create reference to User & export
const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
