const fs = require('fs')

const run = async ()=>{
  const data = fs.readFileSync('./day_1/input.txt', 'utf8')
  const list = data.trim().split('\n').map(line => line.trim().split(/\s+/).map(Number))

  const left = list.map(l=>l[0]).sort((a, b) => b - a) //smallest number is last
  const right = list.map(r=>r[1]).sort((a, b) => b - a)

  const diferences = []

  while (left.length) {
    diferences.push(Math.abs(left.pop() - right.pop()))
  }
  return diferences.reduce((total, num) => total + num, 0)
}

module.exports = async () => {
  const result = await run()
  console.log(`result: `, result)
}