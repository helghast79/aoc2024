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

  //move blocks with same number to the start of the map
  let lastBlock = '.'


  for(let i = blocks.length - 1; i >= 0; i--){
    
    //select the block number to move
    if(blocks[i] !== lastBlock ){
        lastBlock = blocks[i]
    }else{
        continue //only continues on '.'
    }
   
    //calculate the size of the block
    let blockSize = 0
    for(let p = 0; p < blocks.length; p++){
        if(i-p < 0 || blocks[i] !== blocks[i-p]){
            blockSize = p
            break
        }
    }
    
    
    //find the first empty slot from 0 to the left of i that can hold the entire block
    let emptySlot = -1
    let emptySlotSize = 0
    for(let k = 0; k <= i; k++){
       
        //find an empty slot
        if(blocks[k] === '.'){
            emptySlot = k

            emptySlotSize = 0
            for(let p = 0; p < blocks.length; p++){
                if(k+p >= blocks.length || blocks[k] !== blocks[k+p]){
                    emptySlotSize = p
                    break
                }
            }
        }

        //check if it fits the block
        if(emptySlot >= 0 && emptySlotSize > 0 && emptySlotSize >= blockSize){
            //copy block number to new empty slot
            for(let m = emptySlot; m<emptySlot + blockSize; m++){
                blocks[m] = lastBlock
            }
            //delete old block value
            for(let n = i; n > i - blockSize; n--){
                blocks[n] = '.'
            }
            break
        }

        //here we eather have found a block and move it or the empty slot is too short so reset 
        emptySlot = -1
        emptySlotSize = 0
    }

    lastBlock = '.'
    i -= (blockSize - 1) 
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
