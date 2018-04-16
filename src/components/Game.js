import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import { resetGame } from '../store';
import { connect } from 'react-redux';
import { Cell } from './';

class Game extends Component {
  constructor(props){
    super(props)
    this.state = {error: ''}
    this.setError = this.setError.bind(this)
    this.resetError = _.debounce(this.resetError.bind(this), 3000)
  }
  
  setError(msg){
    const { resetError } = this;
    this.setState({error: msg})
    resetError();
  }

  resetError(){
    this.setState({error: ''})
  }

  render() {
    let { board, clicks, free, isGameOver, resetGame } = this.props,
      { setError } = this,
      { error }  = this.state
    return (
      <div className={!free ? 'busy' : ''}>
        <div className="header">
          <h4> Clicks: { clicks } </h4>
          <h4 className="error"> { error } </h4>
          <h4> {isGameOver ? 'You win!' : null} </h4>
          <button className="reset" onClick={resetGame}> <p>Reset</p> </button>
        </div>
        { 
          board.length ? board.map((rowData, row) => {
          return (
            <div key={`r-${row}`} className="row"> {
              rowData.length && rowData.map((number, col) => <Cell setError={setError} key={`${row}-${col}`} row={row} col={col} />)
            }
            </div>
          )}) : <div> Board failed to load. Please refresh the page. </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ board, clicks, isGameOver, free }) => ({ board, clicks, isGameOver, free })
const mapDispatchToProps = dispatch => ({
  resetGame: () => dispatch(resetGame()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Game);
