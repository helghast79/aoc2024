const fs = require('fs')


const signal = (a,b)=>{
  return (a - b) / Math.abs(a - b)
}
const diff = (a,b)=>{
  return Math.abs(a - b)
}

const testReport = (rawReport, ignore = null) => {
  let dir = 0
  let safe = true
  
  let report
  
  if(ignore !== null){
    report = rawReport.slice(0, ignore).concat(rawReport.slice(ignore + 1))
  }else{
    report = rawReport
  }

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
  return safe
}



const run = async ()=>{
  const data = fs.readFileSync('./day_2/input.txt', 'utf8')
  const list = data.trim().split('\n').map(line => line.trim().split(/\s+/).map(Number))
  
  let safeReports = 0
 
  list.map(report => {
    
    if( testReport(report) ){
      safeReports++
    
    }else{
      for(let i = 0; i<report.length; i++){
        if( testReport(report, i) ){
          safeReports++
          break
        }
      }
    }  
  })

  return safeReports
}


module.exports = async () => {
  const result = await run()
  console.log(`result: `, result)
}