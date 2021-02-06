import React from "react"
import Lodash from "lodash"

function TagCloud (props) {

console.log("clodu props: ", props)
const tagArrMaster = []
const tagArrFiltered = []
props.queue.map(album => {
    for (let i=0; i<album.tags.length; i++) {
        tagArrMaster.push(album.tags[i].name)
    }  
})

props.recommended.map(album => {
    for (let i=0; i<album.tags.length; i++) {
        tagArrMaster.push(album.tags[i].name)
    }
})

for (let i =0; i < tagArrMaster.length; i++) {
    if (tagArrMaster[i] != "albums I own" &&
        tagArrMaster[i] != "4ad") {
        tagArrFiltered.push(tagArrMaster[i])
    }
    
}

const countStats = Lodash.countBy(tagArrFiltered)

console.log("countstats: ", countStats)
console.log("tagarr: ", tagArrFiltered)



    return (
        "as"
    )
}

export default TagCloud