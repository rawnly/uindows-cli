#!/usr/bin/env node
'use strict'

require('colors')
let log = console.log

const meow = require('meow')
const fs = require('fs-extra')

const cli = meow(`
  Usage
    $ ls [dir]

  Options
    --write -w Output to a file

  Example
    $ ls ~/Desktop
`)

const ls = (action = './', flags) => {
  if (action && !flags.write) {
    let list = fs.readdirSync(action)
    list.forEach((file) => {
      if (!file.includes('.')) {
        file = file.toString().bold.blue
      }
      log(file)
    })
  } else if (flags.write) {
    fs.writeFile(flags.write, fs.readdirSync(action).toString().split(',').join('\n'), (err, data) => {
      if (!err) {
        log('Success!'.green)
      } else {
        throw err
      }
    })
  }
}

ls(cli.input[0], cli.flags)
