const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')


const run = async (day, part)=>{
  const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
  const list = data.trim().split('\n').map(line => line.trim().split(/\s+/).map(Number))

  const left = list.map(l=>l[0]).sort((a, b) => b - a) //smallest number is last
  const right = list.map(r=>r[1]).sort((a, b) => b - a)

  const diferences = []

  while (left.length) {
    diferences.push(Math.abs(left.pop() - right.pop()))
  }
  return diferences.reduce((total, num) => total + num, 0)
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