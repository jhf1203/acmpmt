import React, { useState } from 'react';
import { Accordion, Card, Button } from "react-bootstrap"


const AlbumList = (props) => {

    const styles = {
        backgroundImage: `url(${props.image[3]["#text"]})`,
        backgroundSize: "280px 280px"
    }

    let colorArr=["#4659a8", "#a8d0e6", "#f76c6c", "#f8e9a1"]
    let selectedColor = Math.floor(Math.random() * colorArr.length)
    console.log("selectedcolor: ", selectedColor)

    return (
        <div className= "col-md-4 album-list-col">
            <div className= "card album-list-card" style={styles} >
                    {/* <img id={props.id} className="list-img" src={props.image[3]["#text"]} alt={props.album} height="100%" width="100%" onClick={props.onClick} /> */}
                    <div className="card-body album-list-body">
                        <div className="row">
                            <p className="album-list-text-album">{props.album}</p>
                        </div>
                        <div className="row">
                            <p className="album-list-text-artist">{props.artist} </p>
                        </div>
                        <div className="row">
                            <p className="album-list-text-link" id={props.id} style={{color: colorArr[selectedColor]}} onClick={props.onClick}>see details</p>
                        </div>
                    </div>
            </div>
        </div>
  );
};
        
export default AlbumList