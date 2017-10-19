const pkg = require('./package.json'),
      env = require('process').env

module.exports = {
  get name () { return pkg.name },
  get port () { return env.PORT || 1337 },
  get basePath() { return __dirname },
  get baseUrl () { return env.BASE_URL || `http://localhost:${module.exports.port}` },
  package: pkg,
  env
}
