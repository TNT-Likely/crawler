import request from 'request'
import fs from 'fs'
import config from '../config'

export default {
  visit: (url) => {
    return new Promise((resolve, reject) => {
      request({
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: url
      }, function(err, response, body) {
        if (err) reject(err)
        else {
          resolve(body)
        }
      })
    })
  },

  download: (url, callback, filename) => {
    let path = config.storage.path
    if (filename && filename.lastIndexOf('/') > 0) {
      path = `${path+filename.substr(0,filename.lastIndexOf('/')+1)}`
      filename = filename.split('/').pop()
    }
    if (!filename) filename = url.split('/').pop()
    if (!fs.existsSync(path)) fs.mkdirSync(path)
    if (!fs.existsSync(`${path+filename}`)) {
      request(url).pipe(fs.createWriteStream(`${path+filename}`)).on('close', callback)
    }
  }
}
