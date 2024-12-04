const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')

const word = 'XMAS'
const directions = [
    [0, 1],   // Right
    [1, 0],   // Down
    [0, -1],  // Left
    [-1, 0],  // Up
    [1, 1],   // Down-Right
    [1, -1],  // Down-Left
    [-1, 1],  // Up-Right
    [-1, -1]  // Up-Left
]



const run = async (day, part)=>{
    const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
    const map = data.trim().split('\n')
    
    const rows = map.length
    const cols = map[0].length
    
    const isValid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols

    const searchWord = (x, y, dirX, dirY) => {
        for (let i = 0; i < word.length; i++) {
            const nx = x + dirX * i
            const ny = y + dirY * i
            if (!isValid(nx, ny) || map[nx][ny] !== word[i]) {
                return false
            }
        }
        return true
    }

    let matches = 0
  
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        for (let [dirX, dirY] of directions) {
          if (searchWord(x, y, dirX, dirY)) {
            matches++
          }
        }
      }
    }
  
    return matches

}


module.exports = async (day, part) => {
  //download puzzle input if not already downloaded
  if(!fs.existsSync(`./day_${day}/input.txt`)){
    console.log('input file not found')
    const fetchOk = await fetchPuzzleInput(day)
    if(!fetchOk){
        console.error('unable to download puzzle input')
        return
    }
  }
  const result = await run(day, part)
  console.log(`result: `, result)
}