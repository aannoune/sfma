//const uploadDir = `${__dirname}/uploads`

const db = require('../../config/db')()

//GET /files operationId
const resumeFiles = (req, res, next) => res.json({files: db.find()})

// GET /files/{file_id}/infos
const getInfoFile = (req, res, next) => res.json(db.find(req.params.file_id))

// GET /files/{file_id}
const downloadFile = (req, res, next) => {
  return db.filePath(req.params.file_id)
    ? res.download(db.filePath(req.params.file_id))
    : res.status(400).send('Invalid ID supplied')
}

module.exports = {resumeFiles, getInfoFile, downloadFile}
