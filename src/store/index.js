import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import sudoku from 'sudoku';
import { splitArray, detectNeighbors } from '../utils';

// constants
const SET_BOARD = 'SET_BOARD';
const RESET_GAME = 'RESET_GAME';
const END_GAME = 'END_GAME';
const SET_IMAGES = 'SET_IMAGES';
const SET_CELL = 'SET_CELL';
const ADD_CONVERTS = 'ADD_CONVERTS';
const RESET_CONVERTS = 'RESET_CONVERTS';
const SET_SELECTED = 'SET_SELECTED';
const SET_FREE = 'SET_FREE';
const SET_BUSY = 'SET_BUSY';
const INCREMENT_CLICKS = 'INCREMENT_CLICKS'

const defaultState = {board: [[]], images: [], converts: [], selectedCell: null, free: true, clicks: 0, isGameOver: false};

// action creators
export const setBoard = board => ({'type': SET_BOARD, board});
export const resetGame = () => ({'type': RESET_GAME});
export const winGame = () => ({'type': END_GAME});
export const setImages = images => ({'type': SET_IMAGES, images});
export const setCell = (row, col, num) => ({'type': SET_CELL, row, col, num});
export const setSelectedCell = num => ({'type': SET_SELECTED, num});
export const setBusy = () => ({'type': SET_BUSY});
export const setFree = () => ({'type': SET_FREE});
export const addConverts = coordsArray => ({'type': ADD_CONVERTS, coordsArray});
export const clearConverts = () => ({'type': RESET_CONVERTS});
export const incrementClicks = () => ({'type': INCREMENT_CLICKS})

// thunks
export const startGame = () => dispatch => {
    const puzzle = sudoku.makepuzzle(),
        rawSolution = sudoku.solvepuzzle(puzzle),
        solutionGrid = splitArray(rawSolution, 9);
    
    dispatch(setBoard(solutionGrid));
}

export const startConversion = (row, col) => (dispatch, getState) => {
    let selectedNum = getState().selectedCell,
        board = getState().board;
    
    dispatch(incrementClicks())
    dispatch(setBusy())
    dispatch(setCell(row, col, selectedNum))
    dispatch(addConverts(detectNeighbors(board, row, col, selectedNum)))
    const step = () => {
        let converts = getState().converts,
            board = getState().board
        if (converts.length){
            dispatch(convertCells());
            setTimeout(step, 250);
        } else {
            dispatch(setFree())
            if (validateWin(board, selectedNum)) dispatch(winGame())
        }
    }
    setTimeout(step, 250)
}

export const convertCells = () => (dispatch, getState) => {
    let converts = getState().converts.map(el => Object.assign({}, el)),
        board = getState().board, selectedNum = getState().selectedCell, 
        convertsToAdd = [];
    converts.forEach(coords => {
        if (board[coords.row][coords.col] === selectedNum) return
        dispatch(setCell(coords.row, coords.col, selectedNum))
        convertsToAdd = convertsToAdd.concat(detectNeighbors(board, coords.row, coords.col, selectedNum))
    })
    dispatch(clearConverts())
    dispatch(addConverts(convertsToAdd))
}

export const validateWin = (board, selectedNum) => board.every(row => row.every(cell => cell === selectedNum))
// reducer 
const reducer = (state = defaultState, action) => {
    let newState = {...state},
        { row, col, num, coordsArray } = action;
    switch (action.type){
        case SET_BOARD:
            newState = {
                ...state,
                board: action.board
            }
            return newState;
        case RESET_GAME:
            newState = {
                ...defaultState
            }
            return newState;
        case SET_IMAGES:
            newState = {
               ...state,
                images: action.images
            }            
            return newState;
        case SET_CELL:
            newState = {
                ...state,
                board: state.board.map((rowData, rowIdx) => rowData.map((cell, colIdx) => rowIdx === row && colIdx === col ? num : cell ))
            }
            return newState;
        case ADD_CONVERTS:
            newState = {
                ...state,
                converts: state.converts.concat(coordsArray)
            }
            return newState;
        case RESET_CONVERTS:
            newState = {
                ...state,
                converts: []
            }
            return newState;
        case SET_SELECTED:
            newState = {
            ...state,
            selectedCell: action.num
            }
            return newState;
        case SET_FREE: {
            newState = {
                ...state,
                free: true
            }
            return newState;   
        }
        case SET_BUSY: {
            newState = {
                ...state,
                free: false
            }
            return newState;   
        }
        case INCREMENT_CLICKS: {
            newState = {
                ...state,
                clicks: state.clicks + 1
            }
            return newState;   
        }
        case END_GAME: {
            newState = {
                ...state,
                isGameOver: true
            }
            return newState;   
        }
        default:
            return newState;
    }
}

export default createStore(reducer, applyMiddleware(thunk));