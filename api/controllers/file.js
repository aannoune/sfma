//const uploadDir = `${__dirname}/uploads`
const fs = require('fs')

const uploadFile = (req, res, next) =>{
	console.log(req.file)
	fs.rename(req.file.path,`${process.cwd()}/uploads/${req.file.originalname}`, (err)=>{
		if(err) {
			res.status(500).send('Upload Error')
			console.log(err)
		}
		else res.status(200).send({id:null,name:req.file.originalname,extension:null,uploaddate:null})
		// A noter que je n'ai pas codé la recupération de toutes les données.. 
		// Vous devriez noter que le fait d'uploader un nouveau fichier perturbera l'attribution des ID: 
		// On ne peut pas se baser uniquement par leur ordre alphabetique, a moins de les renommer dans un format qui enregistre l'id (id_nomfifier.ext )
		// Evidement la solution réside dans le fait de conserver une "base de donnée " a minimuàm sous la forme d'un fichier json
		
})
}
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

module.exports = {resumeFiles, getInfoFile, downloadFile,uploadFile}
