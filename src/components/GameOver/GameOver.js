import React, { Component } from 'react';
import './GameOver.css';

class GameOver extends Component {
  render() {
    return (
      <div className="game-over">
        <div className="game-over-title">
          {this.props.title}
        </div>

        <div>
          <span className="btn btn-lg btn-light" onClick={() => this.props.startGame()}>Restart</span>
        </div>
      </div>
    );
  }
}

export default GameOver;
