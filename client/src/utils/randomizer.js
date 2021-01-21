


export default {

    randomVal: function (file) {
        let randomInd = Math.floor(Math.random() * file.length)
        return [file[randomInd].quote, file[randomInd].artist]
    }
}