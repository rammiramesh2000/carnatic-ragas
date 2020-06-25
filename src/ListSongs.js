import React, { Component } from "react";
import PropTypes from "prop-types";
import RaagaShelf from "./RaagaShelf";

/**
 * @description Represents the "/" page.
 * @constructor
 */
class ListSongs extends Component {
  state = {
    query: '',
    search_mode: "raaga"
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  handleSearchModeChange = event => {
    const { value } = event.target;
    this.setState({search_mode: value});
  }

  getMatchingAlbum = (query) => {
    const { album } = this.props;
    const { search_mode } = this.state;
    let temp_album = [];
    if (search_mode === "raaga") {
      return album.filter((s) => (
        s.raagam.toLowerCase().includes(query.toLowerCase())
      ));
    } else if (search_mode === "song") {
      for (let shelf of album) {
        const filtered_songs = shelf.songs.filter( (song) =>
        song.title.toLowerCase().includes(query.toLowerCase()));
        if (filtered_songs.length > 0) {
          temp_album.push({
            raagam: shelf.raagam,
            collapsed: shelf.collapsed,
            songs: filtered_songs
          });
        }
      }
    } else if (search_mode === "composer") {
      for (let shelf of album) {
        const filtered_songs = shelf.songs.filter( (song) => (
          song.composers.filter(composer => (
            composer.toLowerCase().includes(query.toLowerCase())
          )).length > 0
        ));
        if (filtered_songs.length > 0) {
          temp_album.push({
            raagam: shelf.raagam,
            collapsed: shelf.collapsed,
            songs: filtered_songs
          });
        }
      }
    }
    return temp_album;
  }

  render() {
    const { query, search_mode } = this.state;
    const { album } = this.props;
    const showingAlbum = query.trim() === ''
    ? album
    : this.getMatchingAlbum(query.trim());
    const num_raagas = showingAlbum.length;
    let songSet = new Set();
    let compSet = new Set();

    showingAlbum.map( s => (
      s.songs.map(sng => {
        songSet.add(sng.title);
        return sng.composers.map(c => compSet.add(c));
      })
    ));

    const placeholder = `Search by ${search_mode}`;

    //return JSX
    return (
      <div>
        <div className="search-songs">
          <div className="search-songs-bar">
              <div className="search-changer" >
                <select value={search_mode} onChange={this.handleSearchModeChange}>
                <option value="search" disabled>Search By...</option>
                <option key="raaga" value="raaga">Raaga</option>
                <option key="song" value="song">Song</option>
                <option key="composer" value="composer">Composer</option>
                </select>
              </div>
              <div className="search-songs-input-wrapper">
              <input type="text" placeholder={placeholder} value={query} onChange={event => this.updateQuery(event.target.value)}/>
              </div>
              {showingAlbum.length !== album.length && (
                <div className='showing-album'>
                  <button onClick={this.clearQuery}>Show all</button>
                </div>
              )}
          </div>
          <div className="search-songs-results">
              <ol className="songs-grid">
              </ol>
          </div>
        </div>
      <div className="list-songs">
        <div className="list-songs-title">
          <h1>Carnatic Ragas</h1>
        </div>
        <div className="list-songs-content">
          <div>
              {showingAlbum.map(raagaShelf => (
                <RaagaShelf
                  key={raagaShelf.raagam}
                  songs={raagaShelf.songs}
                  shelfTitle={raagaShelf.raagam}
                />
              ))}
          </div>
        </div>
        <div className="show-counts">{num_raagas} raagas; {songSet.size} songs; {compSet.size} composers </div>

      </div>
      </div>
    );
  }
}


ListSongs.propTypes = {
  album: PropTypes.array.isRequired,
};


export default ListSongs;
