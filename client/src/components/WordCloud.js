import React from "react"
import Lodash from "lodash"
import  { TagCloud }  from "react-tagcloud"

function WordCloud (props) {

const colorArr = ["#F8E9A1", "#4659a8", "#8AD0E6", "#F76C6C", "#ececec"]
const weightArr = [400, 500, 600, 700, 800, 900]
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
const dataArr = []
Object.getOwnPropertyNames(countStats).forEach((val, idx, array) => {
    console.log(val, ": ", countStats[val])
    dataArr.push({
        value: val,
        count: parseInt(countStats[val]),
        color: colorArr[Math.floor(Math.random() * colorArr.length)],
        fontWeight: weightArr[Math.floor(Math.random() * weightArr.length)]
    })
})

const fontSizeMapper = word => Math.log2(word.value) * 8;
const rotate = word => word.value % 360

console.log("countstats: ", countStats)
console.log("tagarr: ", tagArrFiltered)
console.log("dataarr: ", dataArr)



    return (
        <TagCloud
            tags={dataArr}
            minSize={20}
            maxSize={50}
            // fontSizeMapper={fontSizeMapper}
            // rotate={rotate}
        />
    )
}

export default WordCloud;