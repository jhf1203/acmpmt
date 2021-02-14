import axios from "axios";

export default {
  getSimilar: function (artist) {
    console.log("artist param is: ", artist);
    console.log("artist param in the api fn is: ", artist);
    return axios.get(`api/similar/${artist}`);
  },

  getTopAlbum: function (artist) {
    return axios.get(`api/topalbum/${artist}`);
  },

  getAlbumInfo: function (artist, album) {
    return axios.get(`api/album/${artist}/${album}`);
  },
};
