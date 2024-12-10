const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')


const directions = [
    [-1, 0],  // Up
    [0, 1],   // Right
    [1, 0],   // Down
    [0, -1]  // Left
]


const findTrailheads = (map)=>{
    const th = []
    for(let i=0;i<map.length;i++) {
        for(let j=0;j<map[0].length;j++) {
            if(map[i][j] === 0){
                th.push([i,j])
            }
        }
    }
    return th
}



const findTotalHikingTrailsFromPosition = (map, startPos) => {

    const isLeavingMap = (pos, dir) => {
        const newPos = [pos[0]+dir[0], pos[1]+dir[1]]
        return newPos[0] < 0 || newPos[0] >= map.length || newPos[1] < 0 || newPos[1] >= map[0].length
    }

    const validTrails = new Set()
    let trailId = ''

    const findNextPaths = (curPos)=>{
        const curVal = map[curPos[0]][curPos[1]]
        
        //unique identifier of a different trail path (e.g. 3,4|3,5|2,5...)
        trailId += trailId === '' ? `${curPos[0]},${curPos[1]}` : `|${curPos[0]},${curPos[1]}`
        
        if(curVal === 9){
            if(!validTrails.has(trailId)){
                validTrails.add(trailId)
            }
            return
        }
        const nextValidVal = +curVal + 1
        
        for(const dir of directions){
            if(isLeavingMap(curPos, dir)) continue
            const nextPos =  [curPos[0]+dir[0], curPos[1]+dir[1]]
            const nextVal = map[nextPos[0]][nextPos[1]]
           
            if(nextVal === nextValidVal){
                findNextPaths(nextPos)
            }
        }
    }

    findNextPaths(startPos)

    return validTrails.size
}



// Main function to process the input and calculate the result
const run = async (day, part)=>{
    // Read the input file for the specified day
    const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
    //Parse the input into rules and updates
    const map = data
        .trim()
        .split('\n')
        .map(l=> l.split('').map(t=>parseInt(t)))
    
    return findTrailheads(map).reduce( (acc, trail) => acc + findTotalHikingTrailsFromPosition(map, trail), 0)
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
