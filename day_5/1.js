const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')

// Main function to process the input and calculate the result
const run = async (day, part)=>{
  // Read the input file for the specified day
  const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')

  // Parse the input into rules and updates
  const map = data.trim().split('\n') // Split file content by lines
  const rules = map
    .filter(l => l.includes('|')) // Extract lines containing rules
    .map(r => r.trim().split('|').map(n => parseInt(n))) // Parse rules as pairs of integers
  const updates = map
    .filter(l => l.includes(',')) // Extract lines containing updates
    .map(u => u.split(',').map(n => parseInt(n.trim()))) // Parse updates as arrays of integers

  let middleValuesSum = 0 // Accumulator for the sum of middle values

  // Process each update
  for (const update of updates) {
    // Determine the rules applicable to the current update
    const applicableRules = rules.filter(r => update.includes(r[0]) && update.includes(r[1]))

    let updateCorrect = true
    
    // Check if the update violates any applicable rules
    for(const rule of applicableRules){
      if(update.indexOf(rule[0]) > update.indexOf(rule[1])){
        updateCorrect = false
        break
      }
    }
    //sum the middle value if the update is correct
    if(updateCorrect){
      middleValuesSum += update[ (update.length - 1)/ 2]
    }
  }

  return middleValuesSum // Return the total sum
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