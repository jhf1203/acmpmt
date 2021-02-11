import axios from "axios";

export default {
  // Gets all profile
  // getProfile: function() {
  //   return axios.get("/api/profile");
  // },
  // Gets the book with the given id
  getProfile: function(id) {
    console.log("getting the profile with the id: ", id)
    return axios.get("/api/profile/" + id);
  },
  getAllProfiles: function() {
    return axios.get("/api/profile/")
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/profile/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/profile", bookData);
  },

  followUser: function (id, user) {
    return axios ({
      method: "put",
      url: "/api/connection/" + id,
      data: user
    })
  },

  followerAdd: function (id, user) {
    return axios ({
      method: "patch",
      url: "/api/connection/" + id,
      data: user
    })
  },

  unFollow: function (id) {
    console.log("ufollow front end: ", id)
    return axios.put("/api/connection/remove/" + id)
  },

  updateImage: function(id, image) {
    return axios.put("/api/profile/images/" + id, image);
  },

  addToQueue: function(id, album) {
    return axios({
      method: "put",
      url: "/api/profile/" + id,
      data: album
    });
  },

  addToRecs: function(id, album) {
    return axios({
      method: "patch",
      url: "api/profile/" + id,
      data: album
    });
  },

  removeFromQueue: function(id) {
    return axios.put("api/profile/queue/" + id)
  },

  removeFromRecs: function(id) {
    return axios.put("api/profile/recommended/" + id)
  }
};


