#!/usr/bin/env node
'use strict'

require('colors')
let log = console.log

const meow = require('meow')
const fs = require('fs-extra')

const cli = meow(`
  Usage
    $ mkdir <dir>

  Example
    $ mkdir tmp/this/folder/does/not/exists
`)

const mkdir = (action, flags) => {
  if (action) {
    fs.ensureDir(action, (err) => {
      if (!err) {
        log('Success!'.green)
      } else {
        throw err
      }
    })
  } else {
    log('Expected dir')
  }
}

mkdir(cli.input[0], cli.flags)
