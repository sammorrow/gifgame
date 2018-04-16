import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { startGame, setImages, setSelectedCell} from '../store';
import { convertStr } from '../utils';
import { Loading } from './'

class Lobby extends Component {
  constructor(props){
    super(props)
    this.state = {
      dirty: false,
      loading: false,
      imageState: [],
      inputVal: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.selectCell = this.selectCell.bind(this)
    this.fetchImages = _.debounce(this.fetchImages.bind(this), 1000)
  }

  handleChange(e){
    const { fetchImages } = this,
      { setSelectedCell } = this.props
    this.setState({inputVal: e.target.value, loading: true})
    fetchImages()
    setSelectedCell(null)
  }

  fetchImages(){   
    const { setImages } = this.props,
      { inputVal } = this.state
    axios.get(`/fetch/${convertStr(inputVal)}`)
    .then(res => res.data)
    .then(results => {
      setImages(results)
      this.setState({dirty: true, loading: false})
    })
    .catch(err => {
      console.error(err)
    })
  }

  selectCell(idx){
    return () => {
      const { setSelectedCell } = this.props
      setSelectedCell(idx)
    }
  }

  render(){
    const { images, selectedCell, startGame } = this.props
    const { handleChange, selectCell } = this
    const { inputVal, dirty, loading } = this.state
    return (
    <div>
      <h1> the gif glob game </h1>
    <div className="lobby">
        <div className="setup">
          <section className="intro">
            <h4> please enter a topic. </h4>
            <div className="inputForm">
              <input value={inputVal} onChange={handleChange} /> 
              { loading ? <Loading /> : null }
            </div>
            { dirty && images.length < 9 && <div> invalid input: this game requires at least nine images. be sure to choose a common topic. </div>}
          </section>
          { !loading && images.length > 8 ? <section className="choose">
            <h4> alright, we'll be globbing with { inputVal }. good choice. </h4>
            <h4> please select your favorite gif from this list. </h4>
            { images.length ? images.map((image, idx) => {
            return (
              <img 
                key={`i-${image.slug}`}
                onClick={selectCell(idx)}
                className={`cell ${selectedCell === idx ? `active` : ``}`}
                src={image.images.downsized_medium.url} alt={image.slug}
              />
            )
            }) : null}
          </section>
          : null }
          { !loading && selectedCell !== null ? 
            <section className="go">
            <h4> great! we're good to go. </h4>
            <button onClick={startGame}> <p> hit me to begin </p> </button>
          </section>
          : null }
        </div>
        <div className="instructions">
          <section>
            <h3> INSTRUCTIONS </h3>
            <p> the objective of this game is to fill the board with your chosen image in as few clicks as possible. </p>
            <p> clicking a cell converts it to your tile. if a cell is flanked on two opposite sides  (e.g. top and bottom, left and right) by the same gif, it will be absorbed into that gif. </p>
          </section>
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = ({selectedCell, images}) => ({selectedCell, images})
const mapDispatchToProps = dispatch => ({
  setImages: images => dispatch(setImages(images)),
  setSelectedCell: num => dispatch(setSelectedCell(num)),
  startGame: () => dispatch(startGame())
})
export default connect(mapStateToProps, mapDispatchToProps)(Lobby)