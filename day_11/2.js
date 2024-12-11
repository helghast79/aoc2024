const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')



// Main function to process the input and calculate the result
const run = async (day, part)=>{
    // Read the input file for the specified day
    const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
    // Parse the input into rules and updates
    let initialNumbers = data
        .trim()
        .split(' ')
        .map(n=>parseInt(n))
  
    
    const buildTransitions = (numbers) => {
        const transitions = new Map()
        const states = new Map()
        let stateIndex = 0
    
        // Map each unique number to a state index
        for (const num of numbers) {
            if (!states.has(num)) {
                states.set(num, stateIndex++)
            }
        }
    
        // Build the transition map
        for (const [num, idx] of states.entries()) {
            if (!transitions.has(idx)) {
                transitions.set(idx, [])
            }
    
            if (num === 0) {
                const newNum = 1
                if (!states.has(newNum)) {
                    states.set(newNum, stateIndex++)
                }
                transitions.get(idx).push(states.get(newNum))
            } else {
                const str = num.toString()
                if (str.length % 2 === 0) {
                    const mid = Math.floor(str.length / 2)
                    const left = parseInt(str.slice(0, mid))
                    const right = parseInt(str.slice(mid))
    
                    if (!states.has(left)) {
                        states.set(left, stateIndex++)
                    }
                    if (!states.has(right)) {
                        states.set(right, stateIndex++)
                    }
    
                    transitions.get(idx).push(states.get(left), states.get(right))
                } else {
                    const newNum = num * 2024
                    if (!states.has(newNum)) {
                        states.set(newNum, stateIndex++)
                    }
                    transitions.get(idx).push(states.get(newNum))
                }
            }
        }
    
        return { transitions, states }
    }
    

    const processNumbers = (initialNumbers, iterations) => {
        const { transitions, states } = buildTransitions(initialNumbers)
        const vector = Array(states.size).fill(0)
    
        // Initialize the vector with the counts of initial numbers
        for (const num of initialNumbers) {
            vector[states.get(num)]++
        }
    
        // Perform iterations
        for (let i = 0; i < iterations; i++) {
            const newVector = Array(states.size).fill(0)
    
            for (const [from, toList] of transitions.entries()) {
                const count = vector[from]
                if (count > 0) {
                    for (const to of toList) {
                        newVector[to] += count
                    }
                }
            }
    
            vector.splice(0, vector.length, ...newVector)
        }
    
        // Total count of numbers
        return vector.reduce((sum, count) => sum + count, 0)
    }
    
    const iterations = 75
    
    return processNumbers(initialNumbers, iterations)
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
