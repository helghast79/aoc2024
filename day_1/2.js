const fs = require('fs')
 
const run = async ()=>{

  const data = fs.readFileSync('./day_1/input.txt', 'utf8')
  const list = data.trim().split('\n').map(line => line.trim().split(/\s+/).map(Number))

  const left = list.map(l=>l[0]).sort((a, b) => a - b) //smallest number is first
  const right = list.map(r=>r[1]).sort((a, b) => a - b) 

  const diferences = []

  for(const l of left){
    let count = 0
    for(const r of right){
        if(r<l) continue
        if(r>l) break
        count++
    }
    diferences.push(l*count)
  }
  return diferences.reduce((total, num) => total + num, 0)
}

module.exports = async () => {
  const result = await run()
  console.log(`result: `, result)
}