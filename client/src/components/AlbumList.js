import React from "react";
import Bkgd1 from "../assets/logos/logo-100.png";
import Bkgd2 from "../assets/logos/logo-animate-2.png";
import Bkgd3 from "../assets/logos/logo-animate-3.png";
import Bkgd4 from "../assets/logos/logo-animate-4.png";

const AlbumList = (props) => {
  const styles = {
    backgroundImage: `url(${props.image[3]["#text"]})`,
    backgroundSize: "280px 280px",
  };

  let animationArr = [Bkgd1, Bkgd2, Bkgd3, Bkgd4];
  let randomNum = Math.floor(Math.random() * animationArr.length);

  // Randomizing the color in which a certain block of text appears

  let colorArr = ["#4659a8", "#a8d0e6", "#f76c6c", "#f8e9a1"];
  let selectedColor = Math.floor(Math.random() * colorArr.length);

  return (
    <div className="col-md-4 album-list-col">
      <div className="card album-list-card" style={styles}>
        <div className="card-body album-list-body">
          <div className="row">
            <p className="album-list-text-album">{props.album}</p>
          </div>
          <div className="row">
            <p className="album-list-text-artist">{props.artist} </p>
          </div>
          <div className="row">
            <p
              className="album-list-text-link"
              id={props.id}
              style={{ color: colorArr[selectedColor] }}
              onClick={props.onClick}
            >
              see details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumList;
