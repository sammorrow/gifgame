import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Lobby, Game } from './'

class App extends Component {
  render() {
    let { board } = this.props;
    return (
      <div className="App">
        {!board[0].length ? <Lobby /> : <Game /> }
      </div>
    );
  }
}

const mapStateToProps = ({board}) => ({board})
export default connect(mapStateToProps)(App);
