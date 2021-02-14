import React from "react";
import Lodash from "lodash";
import { TagCloud } from "react-tagcloud";

function WordCloud(props) {
  // Randomizing the colors and weights of the text that's populated

  const colorArr = ["#F8E9A1", "#4659a8", "#8AD0E6", "#F76C6C", "#ececec"];
  const weightArr = [400, 500, 600, 700, 800, 900];

  // Mapping the user's lists and pushing them to an array, filtering out unwanted values

  const tagArrMaster = [];
  const tagArrFiltered = [];
  props.queue.map((album) => {
    for (let i = 0; i < album.tags.length; i++) {
      tagArrMaster.push(album.tags[i].name);
    }
  });
  props.recommended.map((album) => {
    for (let i = 0; i < album.tags.length; i++) {
      tagArrMaster.push(album.tags[i].name);
    }
  });
  for (let i = 0; i < tagArrMaster.length; i++) {
    if (
      tagArrMaster[i] != "albums I own" &&
      tagArrMaster[i] != "4ad" &&
      Number.isInteger(parseInt(tagArrMaster[i])) === false
    ) {
      tagArrFiltered.push(tagArrMaster[i]);
    }
  }

  // Tallying frequency of each tag to populate the "count" key, required by the package

  const countStats = Lodash.countBy(tagArrFiltered);
  const dataArr = [];
  Object.getOwnPropertyNames(countStats).forEach((val, idx, array) => {
    dataArr.push({
      value: val,
      count: parseInt(countStats[val]),
      color: colorArr[Math.floor(Math.random() * colorArr.length)],
      fontWeight: weightArr[Math.floor(Math.random() * weightArr.length)],
    });
  });

  return (
    <TagCloud
      tags={dataArr}
      // We can determine the min and max font size for each tag based on it's count.
      minSize={20}
      maxSize={50}
    />
  );
}

export default WordCloud;
