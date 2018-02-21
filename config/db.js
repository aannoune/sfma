const path = require('path')
const fs = require('fs')
const moment = require('moment')

const uploadDir = `${process.cwd()}/uploads`

/* 
 * Returns file info in the uploads folder as an array of objects with keys:
 * id, name, extension, uploaddate
 */
function getFilesData() {
  let fileList = []

  let files = fs.readdirSync(uploadDir)
  files.map(file => {
    let statObj = fs.statSync(`${process.cwd()}/uploads/${file}`)

    fileList.push({
      id: files.indexOf(file),
      name: file,
      extension: path.extname(file),
      uploaddate: moment(statObj['mtime'])
        .locale('fr')
        .format('L LTS')
    })
  })

  return fileList
}

module.exports = function() {
  return {
    fileList: getFilesData(),
    /*
     * Retrieve a file with a given id or return all the file if the id is undefined.
     */
    find(id) {
      if (id) {
        return this.fileList.find(element => element.id === parseInt(id))
      } else {
        return this.fileList
      }
    },
    /*
    * Get file id and returns full file path
    */
    filePath(id) {
      return this.find(id) !== undefined
        ? `${uploadDir}/${this.find(id).name}`
        : false
    }
    /*
     * Delete a file with the given id.
     */
    /*remove(id) {
      let found = 0
      this.fileList = this.fileList.filter(element => {
        if (element.id === id) {
          found = 1
        } else {
          return element.id !== id
        }
      })
      return found
    }*/
  }
}
