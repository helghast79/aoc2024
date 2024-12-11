const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')

const isEven = (number) =>{
  return number % 2 === 0
}

const blink = (arr) => {
  const newArr = []
  for(const stone of arr) {
    //apply rules and decide what to do
    if(stone === 0){
      newArr.push(1)
      
    }else if( isEven(`${stone}`.length)){
      const stoneStr = `${stone}`
      newArr.push(parseInt(stoneStr.slice(0, stoneStr.length/2)))
      newArr.push(parseInt(stoneStr.slice(stoneStr.length/2, stoneStr.length)))

    }else{
      newArr.push(stone*2024)
    }
  }
  return newArr
}


// Main function to process the input and calculate the result
const run = async (day, part)=>{
  // Read the input file for the specified day
  const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
  // Parse the input into rules and updates
  let stonesArr = data
    .trim()
    .split(' ')
    .map(n=>parseInt(n))

  for(let b=0; b<25; b++){
    console.log(b, '=', stonesArr.length)
    stonesArr = blink(stonesArr)
  }
  
  console.log(stonesArr.length)
  
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
