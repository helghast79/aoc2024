const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')


const run = async (day, part)=>{
    let data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
    
    let doing = true //on start we accept muls
    let noMoreMatches = false
    let total = 0

    while(!noMoreMatches) {
        const regex = new RegExp(/mul\(\d+,\d+\)|do\(\)|don't\(\)/)
        const match = regex.exec(data)

        if(match){
            const m1 = match[0]
            const m1Index = match.index
            const m1Length = match[0].length
            
            if(m1 === "do()"){
                doing = true

            }else if(m1 === "don't()"){
                doing = false

            }else{ //mul
                if(doing){
                    const numRegex = /mul\((\d+),(\d+)\)/
                    const nums = m1.match(numRegex)
                    if (nums) {
                        total += (parseInt(nums[1]) * parseInt(nums[2]))
                    }  
                }
            }
            
            data = data.slice(m1Index + m1Length)

        }else{
            noMoreMatches = true
        }
    }
    
    return total
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