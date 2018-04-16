import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startConversion } from '../store';

class Cell extends Component {
  constructor(props){
    super(props)
    this.convertCell = this.convertCell.bind(this)
  }
  convertCell(){
    const { isGameOver, setError, startConversion, selectedCell, row, col, free, board } = this.props;
    if (isGameOver) return;
    if (!free) return setError('Please wait for your last action to complete.')
    if (selectedCell === board[row][col]) return setError('That cell is already set to your gif.')
    startConversion(row, col)
  }

  render(){
    let { convertCell } = this
    let { board, images, row, col } = this.props
    let number = board[row][col]
    return <img onClick={convertCell} className="cell" src={images[number].images.downsized_medium.url} alt={images[number].slug} />
  }
}

const mapStateToProps = ({ board, images, selectedCell, free, isGameOver }, {row, col, setError}) => ({board, images, selectedCell, free, row, col, setError, isGameOver})
const mapDispatchToProps = dispatch => ({
  startConversion: (row, col) => dispatch(startConversion(row, col)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Cell)
