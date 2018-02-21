const express = require('express')
const app = express()

const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
// const fileUpload = require('express-fileupload')

const file = require('./api/controllers/file.js')
const bodyParser = require('body-parser');
const publicDir = `${__dirname}/public`
const swaggerdoc = yaml.load(`${publicDir}/swaggerdoc.yaml`)

// Utilisation de multer : Quant on upload un fichier on le fait souvent via un post encodé en  multipart/form-data
// Pour votre décharge il y avait une legere erreure dans la definition swagger a ce sujet... 
const multer  = require('multer');
const uploadMulter = multer({ dest: `${publicDir}/_uploadtmp/` })
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', port)

//app.use(express.static(publicDir))
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
//ici le middleware d'express
app.post('/files/post',uploadMulter.single('fileupload'), file.uploadFile)

// Listen for requests
const server = app.listen(app.get('port'), function() {
  const port = server.address().port
  console.log('Magic happens on port ' + port)
})
