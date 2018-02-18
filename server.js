const express = require('express')
const path = require('path')
const app = express()

const publicDir = `${__dirname}/public`
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerdoc = yaml.load(`${publicDir}/swaggerdoc.yaml`)

app.set('port', 3000)

app.use(express.static(path.join(publicDir)))
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerdoc, {}))

// Listen for requests
const server = app.listen(app.get('port'), function() {
  const port = server.address().port
  console.log('Magic happens on port ' + port)
})
