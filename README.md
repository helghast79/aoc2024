# Using this code

## Installation

- Clone or download project
- move to project directory
- install dependencies
``` bash
npm install
```

## Setup

### Get Your Session Cookie:

- Log in to the Advent of Code website.
- Open your browser's developer tools.
- Go to the "Storage" or "Cookies" section. (on chromeis is in:  "application" tab -> "storage" -> "cookies" )
- Find the cookie named session.
- Copy its value. (session cookie is valid throughout the month until christmas)

### Create a new .env file in the root of this project and write:
SESSION=cookie_copied_value


## Run the challenges:

each day from 1 Dec to 25 Dec there are is 1 challenge with part 1 and part 2

use the follow schema for running the code for each day/part of the challenge

```bash
npm run start {day} {part}
```

> e.g.:
run day 1 part 2 of the chalenge
```bash
npm run start 1 2npm run start 1 2
```