const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')


const isEven = (number) =>{
  return number % 2 === 0
}


// Main function to process the input and calculate the result
const run = async (day, part)=>{
  // Read the input file for the specified day
  const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
  // Parse the input into rules and updates
  const map = data
  
  const blocks = []

  for(const [i, bVal] of Object.entries(map)){
    if(bVal === 0){
      console.log('zero')
      continue
    }
    if(isEven(i)){
      const bn = i/2
      for(let k = 0; k<bVal;k++ ){
        blocks.push(bn)
      }
    }else{
      for(let k = 0; k<bVal;k++ ){
        blocks.push('.')
      }
    }
  }

  //rearrange blocks
  while(true){
    //find an empty slot candidate
    const emptySpaceIndex = blocks.findIndex(b=>b==='.') 
    if(emptySpaceIndex>=0){
      if(blocks.length > emptySpaceIndex){
        const lastBlock = blocks.pop()
        if(lastBlock !== '.'){
          blocks[emptySpaceIndex] = lastBlock
        }
      }else{
        break
      }
    }else{
      break
    }
  }

  //checksum
  let checkSum = 0
  for(let i = 0; i < blocks.length; i++){
    const bVal = blocks[i]
    if(bVal !== '.'){
      checkSum += bVal * i
    }
  }

  return checkSum
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
