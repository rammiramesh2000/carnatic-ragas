import React from "react";
import PropTypes from "prop-types";
import Song from "./Song";

/**
 * @description Displayes ordered list of songs for one raagam
 * @constructor
 */
const RaagaShelf = props => {
  const { songs, shelfTitle} = props;
  //return JSX
  return (
    <div className="raagashelf">
      <h2 className="raagashelf-title">{shelfTitle}</h2>
      <div className="raagashelf-songs">
        <ol className="songs-grid">
          {songs.map(song => (
            <Song key={song.title} song={song}/>
          ))}
        </ol>
      </div>
    </div>
  );
};

RaagaShelf.propTypes = {
  songs: PropTypes.array.isRequired,
  shelfTitle: PropTypes.string.isRequired,
};

export default RaagaShelf;
