var fs = require('fs')
var ini = require('ini')
var pathExists = require('path-exists')
var log = require('typelog')
var open = require('open')
var parse = require('git-url-parse')

module.exports = function () {
  var configFile = process.cwd() + '/.git/config'
  if(!pathExists.sync(configFile)) {
    return log.error('Not a git repository')
  }
  var config = ini.parse(fs.readFileSync(configFile, 'utf-8'))
  var remote = config['remote "origin"']
  if (!remote) {
    return log.error('Remote origin does not exist')
  }
  var url = parse(remote.url)
  open('http://' + url.resource + '/' + url.owner + '/' + url.name)
}
