const fs = require('fs')
const fetchPuzzleInput = require('../utils/fetchPuzzleInput')

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



const run = async (day, part)=>{
  const data = fs.readFileSync(`./day_${day}/input.txt`, 'utf8')
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