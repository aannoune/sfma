const express = require('express')
const app = express()

const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
// const fileUpload = require('express-fileupload')

const file = require('./api/controllers/file.js')

const publicDir = `${__dirname}/public`
const swaggerdoc = yaml.load(`${publicDir}/swaggerdoc.yaml`)

const port = process.env.PORT || 3000

app.set('port', port)

app.use(express.static(publicDir))
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerdoc, {}))
// app.use(fileUpload())

// Routing
// GET /files
app.get('/files', file.resumeFiles)

// GET /files/{file_id}/infos
app.get('/files/:file_id/infos', file.getInfoFile)

// /files/{file_id}
app.get('/files/:file_id', file.downloadFile)

// POST /files/post
//app.post('/files/post', file.uploadFile)

// Listen for requests
const server = app.listen(app.get('port'), function() {
  const port = server.address().port
  console.log('Magic happens on port ' + port)
})
