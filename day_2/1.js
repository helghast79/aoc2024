const fs = require('fs')


const signal = (a,b)=>{
  return (a - b) / Math.abs(a - b)
}
const diff = (a,b)=>{
  return Math.abs(a - b)
}


const run = async ()=>{
  const data = fs.readFileSync('./day_2/input.txt', 'utf8')
  const list = data.trim().split('\n').map(line => line.trim().split(/\s+/).map(Number))
  
  let safeReports = 0 
  
  list.map(report => {
    let dir = 0
    let safe = true
    
    for(let i = 0; i<report.length - 1; i++){
      
      const sig = signal(report[i], report[i+1])
      const dif = diff(report[i], report[i+1])
      
      if(dir === 0){
        dir = sig
      }else{
        if(sig!== dir){
          safe = false
          break
        }
      }

      if(dif<1 || dif>3){
        safe = false
        break
      }
    }

    if(safe) safeReports++ 
  })

  return safeReports
}


module.exports = async () => {
  const result = await run()
  console.log(`result: `, result)
}