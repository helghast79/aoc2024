const fs = require('fs') 
const fetchPuzzleInput = require('../utils/fetchPuzzleInput') 



// Function to fix the order of a given update based on the specified rules
const fixUpdate = (update, rules) => {
  const pageOrder = {} // Object to store the order of pages
  let i = 1 // Counter to assign order numbers

  // Initialize the page order based on the rules
  for (rule of rules) {
    for (const p of rule) {
      if (!pageOrder[p]) { // Assign order to a page if not already assigned
        pageOrder[p] = i++
      }
    }
  }

  let done = false // Flag to track whether the order is finalized

  // Ensure all rules are respected in the ordering
  while (!done) {
    done = true // Assume the order is correct
    for (const rule of rules) {
      // If the order is incorrect based on the rule, swap the order and retry
      if (pageOrder[rule[0]] > pageOrder[rule[1]]) {
        done = false
        const temp = pageOrder[rule[0]]
        pageOrder[rule[0]] = pageOrder[rule[1]]
        pageOrder[rule[1]] = temp
        break
      }
    }
  }

  // Create an ordered array of pages based on the calculated order
  let orderedArray = new Array(pageOrder.length)
  for (const [p, o] of Object.entries(pageOrder)) {
    orderedArray[o - 1] = p // Map order to the correct position in the array
  }

  return orderedArray // Return the fixed order
}



// Main function to process the input and calculate the result
const run = async (day, part) => {
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

    let updateNeedsFix = false 

    // Check if the update violates any applicable rules
    for (const rule of applicableRules) {
      if (update.indexOf(rule[0]) > update.indexOf(rule[1])) {
        updateNeedsFix = true // Mark the update as needing a fix
        break
      }
    }

    // If the update needs fixing, fix it and add the middle value to the sum
    if (updateNeedsFix) {
      const fixedUpdate = fixUpdate(update, applicableRules)
      middleValuesSum += parseInt(fixedUpdate[(fixedUpdate.length - 1) / 2]) // Add the middle value
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
