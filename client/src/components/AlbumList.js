import React from 'react';


const AlbumList = (props) => {

    const styles = {
        backgroundImage: `url(${props.image[3]["#text"]})`,
        backgroundSize: "280px 280px"
    }

    let colorArr=["#4659a8", "#a8d0e6", "#f76c6c", "#f8e9a1"]
    let selectedColor = Math.floor(Math.random() * colorArr.length)

    return (
        <div className= "col-md-4 album-list-col">
            <div className= "card album-list-card" style={styles} >
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