#!/usr/bin/env node
'use strict'

require('colors')

const meow = require('meow')
const fs = require('fs-extra')

let log = console.log

const cli = meow(`
  Usage
    $ cat <file>

  Options
    --write -w Write the output to another file

  Examples
    $ cat my_awsome_file.txt -w my_second_awsome_file.txt
`, {
  alias: {
    w: 'write'
  }
})

const cat = (action, flags) => {
  if (action && !flags.write) {
    action.split(',').forEach((file) => {
      log()
      log(fs.readFileSync(file, 'utf-8'))
    })
  } else if (flags.write) {
    fs.writeFile(flags.write, fs.readFileSync(action, 'utf-8'), (err, data) => {
      if (!err) {
        log('Success!'.green)
      } else {
        throw err
      }
    })
  }
}

cat(cli.input[0], cli.flags)
