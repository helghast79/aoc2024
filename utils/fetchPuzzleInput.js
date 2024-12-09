require('dotenv').config()
const axios = require('axios')
const fs = require('fs')

const fetchPuzzleInput = async (day) => {

  const sessionCookie = process.env.SESSION
  
  if(!sessionCookie) {
      console.error('Unable to download - Please save session cookie in .env file')
      return false
  }

  const url = `https://adventofcode.com/2024/day/${day}/input`
  
  try {
    const response = await axios.get(url, {
      headers: {
        Cookie: `session=${sessionCookie}`
      },
      responseType: 'text'
    })

    fs.writeFileSync(`./day_${day}/input.txt`, response.data.trim())
    console.log(`Input for day ${day} saved to day_${day}_input.txt`)
    
    return fs.existsSync(`./day_${day}/input.txt`)

  } catch (error) {
    console.error('Failed to fetch puzzle input:', error.message)
  }
    
}


module.exports = fetchPuzzleInput