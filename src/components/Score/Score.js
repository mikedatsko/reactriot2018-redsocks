import React, { Component } from 'react';
import './Score.css';

class Score extends Component {
  getScorePercent(type) {
    const all = this.props.fieldList.length;
    const typed = this.props.fieldList.filter(field => field.type === type).length;

    return Math.round(typed / all * 100);
  }

  render() {
    return (
      <div className="score">
        <div className="score-own">{this.props.own}</div>
        <div className="score-progress">
          <div className="score-progress-own">
            <div className="score-bar" style={{height: this.getScorePercent('own') + '%'}} />
            <div className="score-data">{this.getScorePercent('own') + '%'}</div>
          </div>
          <div className="score-progress-opponent">
            <div className="score-bar" style={{height: this.getScorePercent('opponent') + '%'}} />
            <div className="score-data">{this.getScorePercent('opponent') + '%'}</div>
          </div>
        </div>
        <div className="score-opponent">{this.props.opponent}</div>
      </div>
    );
  }
}

export default Score;
