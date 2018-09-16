import React, { Component } from 'react';
import './Start.css';

class Start extends Component {
  constructor(props) {
    super(props);

    this.stars = [];
    this.numStars = 100;
    this.speed = 10;
    this.interval = undefined;

    for (let i = 0; i < this.numStars; i++) {
      this.stars[i] = this.makeStar();
    }
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => this.updateStars(), 30);
  }

  makeStar() {
    return {
      x: Math.random(),
      y: Math.random(),
      distance: Math.sqrt(Math.random()),
      color: 'hsl(' + Math.random() * 40 + ',100%,' + (70 + Math.random() * 30) + '%)'
    };
  }

  updateStars() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.numStars; i++) {
      this.stars[i].x -= Math.pow(this.stars[i].distance,2) / this.canvas.width * this.speed;

      if (this.stars[i].x <= 0) {
        this.stars[i] = this.makeStar();
        this.stars[i].x = 1;
      }

      this.ctx.beginPath();
      this.ctx.arc(this.stars[i].x * this.canvas.width, this.stars[i].y * this.canvas.height, this.stars[i].distance * 2, 0, 2 * Math.PI, false);
      this.ctx.lineWidth = this.stars[i].distance * 4;
      this.ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      this.ctx.stroke();
      this.ctx.fillStyle = this.stars[i].color;
      this.ctx.fill();
    }
  }

  render() {
    return (
      <div className="start">
        <div className="legend">
          Somewhere in the deep deep space...

          <br/>
          <br/>

          <div className="btn btn-outline-light btn-lg" onClick={() => this.props.startGame()}>Start</div>
        </div>
        <canvas id="canvas" />
      </div>
    );
  }
}

export default Start;
