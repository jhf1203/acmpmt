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
  addToQueue: function(id, album) {
    return axios({
      method: "patch",
      url: "/api/profile/" + id,
      data: album
    });
  },
  addToRecs: function(id, album) {
    return axios({
      method: "put",
      url: "/api/profile/" + id,
      data: album
    });
  }
};
