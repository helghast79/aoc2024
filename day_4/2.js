const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')



const run = async (day, part)=>{
    const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
    const map = data.trim().split('\n')
    
    const rows = map.length
    const cols = map[0].length
    
    let matches = 0
  
    for (let x = 1; x < rows-1; x++) {
      for (let y = 1; y < cols-1; y++) {
        //search around the A's
        if(map[x][y]=== 'A'){
            
            //only need 2 directions since the other 2 are the oposites
            let dir1 = [-1, 1]  // Up-Right
            let dir2 = [-1, -1] // Up-Left

            //get the 2 chars with oposite directions for each of the diagonals
            const diag1 = map[x+dir1[0]][y+dir1[1]] + map[x-dir1[0]][y-dir1[1]]
            const diag2 = map[x+dir2[0]][y+dir2[1]] + map[x-dir2[0]][y-dir2[1]]
            
            //we are looking for MS or SM in the diagonals
            if( (diag1 === 'MS' || diag1 === 'SM') && (diag2 === 'MS' || diag2 === 'SM')){
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