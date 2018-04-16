export function splitArray(array, part) {
    var tmp = [];
    for(var i = 0; i < array.length; i += part) {
        tmp.push(array.slice(i, i + part));
    }
    return tmp;
}
  
export function convertStr(str){
  return str.toLowerCase().split(' ').join('+')
}

export const detectNeighbors = (board, row, col, selectedNum) => {
    const offsetArray = [[0, 2], [2, 0], [0, -2], [-2, 0]] // top right down left
    let newConverts = []
    offsetArray.forEach(([width, height]) => {
        const offsetHeight = row + height, offsetWidth = col + width
        if (Math.min(0, offsetHeight, offsetWidth) !== 0 || Math.max(8, offsetHeight, offsetWidth) !== 8) return;
        const farNeighbor = board[offsetHeight][offsetWidth], potentialConvert = board[row + (height / 2)][col + (width / 2)]
        if (farNeighbor === selectedNum && potentialConvert !== selectedNum) {
            newConverts = newConverts.concat(({row: row + (height / 2), col: col + (width / 2)}))
        }
    })
    return newConverts
}