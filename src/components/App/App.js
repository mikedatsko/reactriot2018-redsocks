import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Field } from '../Field';
import { GameOver } from '../GameOver';
import { Score } from '../Score';
import { Process } from '../Process';
import { Start } from '../Start';
import { fieldLeftSideList, fieldListDefault, fieldRightSideList } from '../../data';

class App extends Component {
  constructor() {
    super();

    this.state = {
      fieldList: [],
      isGameOver: false,
      isGameStarted: false,
      isRunning: false,
      isStarted: false,
      gameOverTitle: '',
      ownScore: 0,
      opponentScore: 0
    };

    this.audio = {
      explode: new Audio('http://datsko.info/explode.mp3'),
      theme: new Audio('http://datsko.info/theme.mp3'),
      opponent: new Audio('http://datsko.info/opponent.mp3'),
      own: new Audio('http://datsko.info/own.mp3'),
      gameOver: new Audio('http://datsko.info/game-over.mp3'),
      win: new Audio('http://datsko.info/win.mp3')
    };

    this.audio.theme.loop = true;
  }

  componentDidMount() {
    this.playAudio('theme');
  }

  getFieldDefaultList() {
    return fieldListDefault();
  }

  startGame() {
    const newFieldList = this.getFieldDefaultList();

    this.setState({
      fieldList: newFieldList.map(field => {
        field.level = 0;
        return field;
      }),
      isStarted: true,
      isGameOver: false,
      isGameStarted: true,
      isRunning: false,
      gameOverTitle: '',
      ownScore: 0,
      opponentScore: 0
    });
  }

  selectField(field, fieldIndex) {
    if (field.type !== 'ownRun') {
      return;
    }

    this.setState({isRunning: true});

    // let isExploding = false;

    this.playAudio('own');
    let score = 0;

    this.setState({
      fieldList: [...this.state.fieldList.map((field, index) => {
        field.level = 0;

        if (fieldIndex === index) {
          score = 1;
          field.type = 'own';
        }

        if (this.isFieldValid('own', field, index, fieldIndex)) {
          if (field.type === 'opponent') {

          } else if (field.type === 'opponentRun') {
            field.type = 'explode';
            this.playAudio('explode');
            // isExploding = true;
            score += 2;
            setTimeout(() => field.type = 'ownRun', 800);
          } else {
            score += 1;
            field.type = 'ownRun';
          }
        }

        return field;
      })]
    });

    this.setState({ownScore: this.state.ownScore + score});

    if (!this.state.fieldList.filter(field => field.type === 'opponent').length) {
      this.gameOver();
    }

    setTimeout(() => this.selectOpponent(), 800);
  }

  selectOpponent() {
    const opponentRunFieldList = [];

    this.playAudio('opponent');

    for (let i = 0; i < this.state.fieldList.length; i++) {
      const field = this.state.fieldList[i];

      if (field.type === 'opponentRun') {
        opponentRunFieldList.push(i);
      }
    }

    if (!opponentRunFieldList.length) {
      this.gameOver();
      return;
    }

    let score = 0;
    const fieldIndex = opponentRunFieldList[this.getRandomInt(0, opponentRunFieldList.length - 1)];

    this.setState({
      fieldList: [...this.state.fieldList.map((field, index) => {
        if (fieldIndex === index) {
          score = 1;
          field.type = 'opponent';
        }

        if (this.isFieldValid('opponent', field, index, fieldIndex)) {
          if (field.type === 'own') {

          } else if (field.type === 'ownRun') {
            field.type = 'explode';
            this.playAudio('explode');
            // isExploding = true;
            score += 2;
            setTimeout(() => field.type = 'opponentRun', 800);
          } else {
            score += 1;
            field.type = 'opponentRun';
          }
        }
        return field;
      })]
    });

    this.setState({opponentScore: this.state.opponentScore + score});

    setTimeout(() => this.checkFieldList(), 800);
  }

  playAudio(type) {
    const audio = this.audio[type];

    if (audio) {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.then(function() {

        }).catch(function(error) {

        });
      }
    }
  }

  isFieldValid(type, field, index, fieldIndex) {
    return (
      (index === fieldIndex - 11 && field.type !== type && !fieldLeftSideList.includes(fieldIndex - 11)) ||
      (index === fieldIndex - 10 && field.type !== type) ||
      (index === fieldIndex - 9  && field.type !== type && !fieldRightSideList.includes(fieldIndex - 9)) ||
      (index === fieldIndex - 1  && field.type !== type && !fieldLeftSideList.includes(fieldIndex - 1)) ||
      (index === fieldIndex + 1  && field.type !== type && !fieldRightSideList.includes(fieldIndex + 1)) ||
      (index === fieldIndex + 9  && field.type !== type && !fieldLeftSideList.includes(fieldIndex + 9)) ||
      (index === fieldIndex + 10 && field.type !== type) ||
      (index === fieldIndex + 11 && field.type !== type && !fieldRightSideList.includes(fieldIndex + 11))
    );
  }

  gameOver() {
    const isGameOver = this.state.opponentScore >= this.state.ownScore;

    this.playAudio(isGameOver ? 'gameOver' : 'win');

    this.setState({
      isGameOver: true,
      gameOverTitle: isGameOver ? 'Game Over' : 'You WIN!'
    });
  }

  checkFieldList() {
    this.setState({
      fieldList: this.state.fieldList.map((field, index) => {
        if (field.type === 'own' || field.type === 'opponent') {
          const isOwn_XM1_YM1 = this.state.fieldList[index - 11] && this.state.fieldList[index - 11].type === 'own';
          const isOwn_X0__YM1 = this.state.fieldList[index - 10] && this.state.fieldList[index - 10].type === 'own';
          const isOwn_XP1_YM1 = this.state.fieldList[index - 9] && this.state.fieldList[index - 9].type === 'own';
          const isOwn_XM1_Y0_ = this.state.fieldList[index - 1] && this.state.fieldList[index - 1].type === 'own';
          const isOwn_XP1_Y0_ = this.state.fieldList[index + 1] && this.state.fieldList[index + 1].type === 'own';
          const isOwn_XM1_YP1 = this.state.fieldList[index + 9] && this.state.fieldList[index + 9].type === 'own';
          const isOwn_X0__YP1 = this.state.fieldList[index + 10] && this.state.fieldList[index + 10].type === 'own';
          const isOwn_XP1_YP1 = this.state.fieldList[index + 11] && this.state.fieldList[index + 11].type === 'own';

          if (
            isOwn_XM1_YM1 && isOwn_X0__YM1 && isOwn_XP1_YM1 &&
            isOwn_XM1_Y0_ && isOwn_XP1_Y0_ &&
            isOwn_XM1_YP1 && isOwn_X0__YP1 && isOwn_XP1_YP1
          ) {
            field.level = 1;
            this.setState({[`${field.type}Score`]: this.state[`${field.type}Score`] + 4});
          }
        }

        return field;
      })
    });

    const fieldList = this.state.fieldList;

    if (!fieldList.filter(field => field.type === 'neutral').length || !fieldList.filter(field => field.type === 'ownRun').length) {
      this.gameOver();
    } else {
      this.setState({isRunning: false});
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render() {
    return (
      <div className="app">
        <Score fieldList={this.state.fieldList} own={this.state.ownScore} opponent={this.state.opponentScore} />

        <Field
          fieldList={this.state.fieldList}
          selectField={(field, index) => this.selectField(field, index)}
          isRunning={this.state.isRunning}
        />

        <div className="btn-container">
          <span
            className={'btn btn-lg btn-outline-light float-right'}
            onClick={() => this.startGame()}
          >
            Restart
          </span>
        </div>

        <Process />

        {this.state.isGameOver && <GameOver title={this.state.gameOverTitle} startGame={() => this.startGame()} />}

        {!this.state.isStarted && <Start startGame={() => this.startGame()} />}
      </div>
    );
  }
}

export default App;
