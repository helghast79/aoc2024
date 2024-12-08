const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')


function evaluateExpression(numbers, operators) {
  let result = numbers[0]
  for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '+') {
          result += numbers[i + 1]
      } else if (operators[i] === 'x') {
          result *= numbers[i + 1]
      }
  }
  return result
}


function generateCombinations(numbers, operators, current) {
  if (current.length === numbers.length - 1) {
      return [current]
  }

  const combos = []
  for (const op of operators) {
      combos.push(...generateCombinations(numbers, operators, [...current, op]))
  }
  return combos
}


const assert = (test) => {
  const { val: testValue, numbers } = test
  
  const operators = ['+', 'x']
  
  const operatorCombinations = generateCombinations(numbers, operators, [])

  for (const combination of operatorCombinations) {
    if (evaluateExpression(numbers, combination) === testValue) {
        return true
    }
  }

  return false
}


// Main function to process the input and calculate the result
const run = async (day, part)=>{
  // Read the input file for the specified day
  const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
  // Parse the input into rules and updates
  const map = data.trim().split('\n') // Split file content by lines
  
  const tests = map.map(line => {
    const test = line.split(':')
    const numbers = test[1].trim().split(' ').map(n=>parseInt(n))
    return { val: parseInt(test[0]), numbers}
  })

  return tests.reduce((acc, test) => assert(test) ? acc + test.val : acc , 0)
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