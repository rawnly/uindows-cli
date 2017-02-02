#!/usr/bin/env node
'use strict'

require('colors')
const meow = require('meow')
const fs = require('fs-extra')

let log = console.log

const cli = meow(`
  Usage
    $ touch <file>
`)

const touch = (action, flags) => {
  if (action) {
    fs.writeFile(action, ' ', (err, ndata) => {
      if (!err) {
        log('')
        log('Success'.green)
      } else {
        throw err
      }
    })
  }
}

touch(cli.input[0], cli.flags)
