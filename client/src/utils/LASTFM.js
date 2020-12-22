import axios from "axios"

export default {
    getSimilar: function (artist) {
        return axios.get(`api/similar/${artist}`)
    },
    getTopAlbum: function (artist) {
        return axios.get(`api/topalbum/${artist}`)
    },
    getAlbumInfo: function (artist, album) {
        return axios.get(`api/album/${artist}/${album}`)
    }
}