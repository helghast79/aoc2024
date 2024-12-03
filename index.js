const path = require('path')
const args = process.argv.slice(2)

if (args.length < 2) {
  console.error('Usage: npm run start <day> <part>')
  process.exit(1)
}

const [day, part] = args

const scriptPath = path.join(__dirname, `day_${day}`, `${part}.js`)

try {
  const module = require(scriptPath)
  console.log(`------- day ${day} - part ${part} --------`)
  
  if (typeof module === 'function') {
    module(day, part)
  } else {
    console.log('Module loaded, but no default function to execute')
  }
} catch (error) {
  console.error(`Failed to load script: ${scriptPath}`)
  console.error(error.message)
}