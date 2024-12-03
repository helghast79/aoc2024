const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')


const run = async (day, part)=>{
    const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
    
    const regex = new RegExp(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)
    const matchMuls = data.match(regex)
    
    const mulsSum = matchMuls.reduce((total, mulStr) => {
        const numRegex = /mul\((\d+),(\d+)\)/
        const nums = mulStr.match(numRegex)
        if (nums) {
            return total + (parseInt(nums[1]) * parseInt(nums[2]))
        }
        return total // If no match, just return the current total
    },0)
    
    return mulsSum
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