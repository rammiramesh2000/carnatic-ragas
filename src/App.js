import React from "react";
import { Route } from "react-router-dom";
import * as SongsAPI from "./SongsAPI";
import ListSongs from "./ListSongs";
import "./App.css";

/**
 * @description Main app component that routes to ListSongs and
 *              handles common data state and SongsAPI calls.
 * @constructor
 */
class SongsApp extends React.Component {
  /**
   * Tracks the list of songs
   */
  state = {
    album: []
  }

  /**
   * Initial call to get list of songs using SongsAPI.
   */
  componentDidMount() {
    SongsAPI.getAll().then(album => {
      this.setState({ album });
    });
  }

  render() {

    // Pass search from here to limit direct API calls to only this component
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListSongs album={this.state.album}/>
        )} />
      </div>
    )
  }
}

export default SongsApp;
