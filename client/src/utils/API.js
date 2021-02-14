import axios from "axios";

export default {
  getProfile: function (id) {
    return axios.get("/api/profile/" + id);
  },

  getAllProfiles: function () {
    return axios.get("/api/profile/");
  },

  followUser: function (user, id) {
    return axios({
      method: "put",
      url: "/api/connection/" + id,
      data: user,
    });
  },

  followerAdd: function (user, id) {
    return axios({
      method: "patch",
      url: "/api/connection/" + user,
      data: id,
    });
  },

  unFollow: function (id) {
    return axios.put("/api/connection/remove/" + id);
  },

  updateImage: function (id, image) {
    return axios.put("/api/profile/images/" + id, image);
  },

  addToQueue: function (id, album) {
    return axios({
      method: "put",
      url: "/api/profile/" + id,
      data: album,
    });
  },

  addToRecs: function (id, album) {
    return axios({
      method: "patch",
      url: "api/profile/" + id,
      data: album,
    });
  },

  removeFromQueue: function (id) {
    return axios.put("api/profile/queue/" + id);
  },

  removeFromRecs: function (id) {
    return axios.put("api/profile/recommended/" + id);
  },
};
