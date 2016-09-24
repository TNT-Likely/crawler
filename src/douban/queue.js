import queue from 'async/queue'
import request from '../../tools/request'
import query from './query'
import config from '../../config'

export let douban = queue((url, callback) => {
  request.visit(`${url}`).then(info => {
    query.douban(info).forEach(item => {
      request.download(item.src, () => {
        console.log(`download success >>> ${item.src}`)
      })
    })
    callback()
  })
}, config.queue.size)
