const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')

//rotating right in a specific direction will be to move index 1 position
const directions = [
  [-1, 0],  // Up
  [0, 1],   // Right
  [1, 0],   // Down
  [0, -1]  // Left
]




// Main function to process the input and calculate the result
const run = async (day, part)=>{
  // Read the input file for the specified day
  const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
  // Parse the input into rules and updates
  const map = data.trim().split('\n') // Split file content by lines
        .map(line => line.split(''))

 
  let initialRow = null
  let initialCol = null
  //find the guard initial position and direction
  rowLoop: for(let i=0;i<map.length;i++) {
    for(let j=0;j<map[0].length;j++) {
      if(map[i][j] === '^'){
        initialRow = i
        initialCol = j
        break rowLoop
      }
    }
  }
  
  const isInsideMap = (row, col) => row >= 0 && row < map.length && col >= 0 && col < map[0].length

  
  const simulateGuardMoving = (testRow, testCol) => {
    const visited = new Set()
    let row = initialRow, col = initialCol, dir = 0

    while (true) {
      const state = `${row},${col},${dir}`
      if (visited.has(state)){
        return true // Loop detected
      }
      visited.add(state)

      const [dRow, dCol] = directions[dir]
      const nextRow = row + dRow
      const nextCol = col + dCol

      if (!isInsideMap(nextRow, nextCol)){
        return false // Exits the map
      }

      // If the car hits an obstacle (existing or test), turn 90º clockwise
      if (map[nextRow][nextCol] === '#' || (nextRow === testRow && nextCol === testCol)) {
        dir = (dir + 1) % 4
      } else {
        row = nextRow
        col = nextCol
      } 
    }
  }

  let countObsPositionsThatLeedToLoops = 0

  //test every location to place the obstacle
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === '.' && !(r === initialRow && c === initialCol)) {
        // Check if the obstacle leads to a loop or not (true is a loop, false is not)
        if (simulateGuardMoving(r, c)) countObsPositionsThatLeedToLoops++
      }
    }
  }

  return countObsPositionsThatLeedToLoops
}


// Module export to handle puzzle input and execute the main logic
module.exports = async (day, part) => {
  // Check if the input file exists; download it if not
  if (!fs.existsSync(`./day_${day}/input.txt`)) {
    console.log('input file not found')
    const fetchOk = await fetchPuzzleInput(day)
    if (!fetchOk) {
      console.error('unable to download puzzle input')
      return
    }
  }
  
  // Run the main logic and log the result
  const result = await run(day, part)
  console.log(`result: `, result)
}