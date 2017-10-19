const fs = require('fs'),
      http = require('http'),
      path = require('path'),
      url = require('url'),
      { basePath, port } = require('../'),
      dict = {'.js': 'text/javascript', '.html': 'text/html'}

const server = http.createServer((req, res) => {
  const pathname = path.join(basePath, 'client/public', url.parse(req.url).pathname),
        ext = path.parse(pathname).ext || '.html',
        stat = safeStat(pathname)

  if (!stat) {
    res.statusCode = 404
    return res.end('file not found')
  }

  fs.readFile(stat.isDirectory() ? pathname + 'index' + ext : pathname, (err, data) => {
    if (err) {
      res.statusCode = 500
      return res.end('failed to access', pathname)
    }

    console.log(pathname, data)
    res.setHeader('Content-Type', dict[ext] || 'text/plain')
    res.end(data)
  })
})

server.listen(port, '', () => console.log('listening on', port))

function safeStat (pathname) {
  try {
    const stat = fs.statSync(pathname)
    return stat
  }
  catch (e) {
    console.error(e)
    return undefined
  }
}
