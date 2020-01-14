const { port } = require('./app')
const config = {}

config.WEB_SOCKET_URL = `ws://localhost:${port}`

module.exports = config
