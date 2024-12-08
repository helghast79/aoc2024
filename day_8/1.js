const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')



// Main function to process the input and calculate the result
const run = async (day, part)=>{
  // Read the input file for the specified day
  const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
  // Parse the input into rules and updates
  const map = data
    .trim()
    .split('\n')
    .map(line => line.split(''))
  
  //find the antesnas positions
  const antenas = {}
  for(let i=0;i<map.length;i++) {
    for(let j=0;j<map[0].length;j++) {
      if(map[i][j] !== '.'){
        const antenaKey = map[i][j]
        if(!antenas[antenaKey]){
          antenas[antenaKey] = []
          antenas[antenaKey].push({x: i, y: j})
        
        }else{
          if( !antenas[antenaKey].some(a=>a.x===i && a.y===j) ){
            antenas[antenaKey].push({x: i, y: j})
          }
        }
      }
    }
  }

  const isNodeValid = (an) => {
    return !(an.x < 0 || an.x >= map.length || an.y < 0 || an.y >= map[0].length )
  }

  //save antinodes coordinates
  const antinodes = new Set()

  //find the distance between each pair of antenas of the same type
  for(const [antKey, compatAntenas] of Object.entries(antenas)){
   
    for(const [i, first] of Object.entries(compatAntenas)){
      for(const [j, second] of Object.entries(compatAntenas)){
        if(i === j) continue //same as first
        const nx = Math.abs(first.x - second.x)
        const ny = Math.abs(first.y - second.y)
        const antiNode1 = {}
        const antiNode2 = {}
        if(first.x < second.x){
          antiNode1.x = first.x - nx
          antiNode2.x = second.x + nx
        }else{
          antiNode1.x = first.x + nx
          antiNode2.x = second.x - nx
        }
        if(first.y < second.y){
          antiNode1.y = first.y - ny
          antiNode2.y = second.y + ny
        }else{
          antiNode1.y = first.y + ny
          antiNode2.y = second.y - ny
        }
        const ant1 = `${antiNode1.x},${antiNode1.y}`
        const ant2 = `${antiNode2.x},${antiNode2.y}`

        //add the antinode if not already present
        if(isNodeValid(antiNode1) && !antinodes.has(ant1)){
          antinodes.add(ant1)
        }
        if(isNodeValid(antiNode2) && !antinodes.has(ant2)){
          antinodes.add(ant2)
        }
      }
    }
  }
  
  return antinodes.size
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
