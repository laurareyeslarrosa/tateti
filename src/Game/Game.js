import React from 'react';
import './Game.css'

class Square extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            squareValue: ''
        }
        this.setSquareValue = this.setSquareValue.bind(this);
    }

    setSquareValue() {
        if (this.state.squareValue == '') {
            this.setState({
                squareValue: this.props.currentPlayer
            });
            this.props.onclickHandler();
        }
    }

    render() {
        return (
            <button className='square' onClick={this.setSquareValue}>
                {this.state.squareValue}
            </button>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: 'X'
        };
        this.updateCurrentPlayer = this.updateCurrentPlayer.bind(this);
        this.updateGameHistory = this.updateGameHistory.bind(this);
    }

    renderSquare(index) {
        return <Square 
        index={index} 
        currentPlayer={this.state.currentPlayer} 
        onclickHandler={this.onSquareClickHandler}/>
    }

    onSquareClickHandler(index) {
        this.updateGameHistory(index);
        this.updateCurrentPlayer();
    }

    updateGameHistory(index) {
        this.props.onClickBoardHandler(index, this.state.currentPlayer);
    }

    updateCurrentPlayer() {
        

        this.setState({
            currentPlayer: ((this.state.currentPlayer == 'X') ? 'O' : 'X')
        });
        console.log(this);
    }

    render() {
        const status = 'Next player: ' + this.state.currentPlayer;
    
        return (
          <div>
            <div className="status">{status}</div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
      }
}


export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        };
        this.setHistory = this.setHistory.bind(this);
        this.renderHistory = this.renderHistory.bind(this);
    }

    setHistory(index, player) {
        let historyArray = this.state.history;
        historyArray.push(player + ' - ' + index)
        this.setState({
            historyArray
        })
    }

    renderHistory() {
        let html = '';
        console.log(this.state.history);

        this.state.history.map((item) => {
            html += '<li>' + item + '</li>';
        })
        
        return html;
    }
    
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board onChangeHandler={this.setHistory}/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{this.renderHistory()}</ol>
          </div>
        </div>
      );
    }
  }

