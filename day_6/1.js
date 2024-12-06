const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')

//rotating right in a specific direction will be to move index 1 position
const directions = [
  [-1, 0],  // Up
  [0, 1],   // Right
  [1, 0],   // Down
  [0, -1]  // Left
]

const rotate = (dir)=>{
  //find index of given direction
  const dirIndex = directions.findIndex(d=>(d[0] === dir[0] && d[1] === dir[1]))
  const newDirIndex = dirIndex === directions.length - 1 ? 0 : +dirIndex + 1
  return directions[newDirIndex]
}




// Main function to process the input and calculate the result
const run = async (day, part)=>{
  // Read the input file for the specified day
  const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
  // Parse the input into rules and updates
  const map = data.trim().split('\n') // Split file content by lines
        .map(line => line.split(''))

  let guardPos = null
  let dir = null
  //find the guard initial position and direction
  rowLoop: for(let i=0;i<map.length;i++) {
    for(let j=0;j<map[0].length;j++) {
      if(map[i][j] === '^'){
        guardPos = [i, j]
        dir = [-1, 0]
        break rowLoop
      }
    }
  }
  
  //move the guard position with the given direction
  const moveGuard = (pos, dir)=>{
    const newPos = [pos[0]+dir[0], pos[1]+dir[1]]
    map[newPos[0]][newPos[1]] = 'X'
    return newPos
  }

  const canMove = (pos, dir) => {
    const newPos = [pos[0]+dir[0], pos[1]+dir[1]]
    return map[newPos[0]][newPos[1]] !== '#'
  }

  const isLeavingMap = (pos, dir) => {
    const newPos = [pos[0]+dir[0], pos[1]+dir[1]]
    return newPos[0] < 0 || newPos[0] >= map.length || newPos[1] < 0 || newPos[1] >= map[0].length
  }
  
  //mark the start position of the guard as visited
  guardPos = moveGuard(guardPos, [0,0])
  
  while(!isLeavingMap(guardPos, dir)){
    if(canMove(guardPos,dir)){
      guardPos = moveGuard(guardPos, dir)
    }else{
      dir = rotate(dir)
    }
  }
  
  //count guard visited positions
  const visited = map.reduce((acc, line) => {
    return acc + line.filter(g=>g==='X').length
  }, 0)

  return visited
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