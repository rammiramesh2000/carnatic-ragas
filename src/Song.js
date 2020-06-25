import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * @description Component representing a single Song.
 * @constructor
 */
class Song extends Component {

  render() {
    const { song } = this.props;
    const uri = `https://www.youtube.com/results?search_query=${encodeURIComponent(song.title)}`

    return (
      <li>
      <div className="song">
          <a href={uri} target="_blank" rel="noopener noreferrer">
          <div className="song-title">{song.title}</div>
           </a>
          <div className="song-authors">{song.composers}</div>
      </div>
      </li>
    );
  }
}

Song.propTypes = {
  song: PropTypes.object.isRequired,
};

export default Song;
