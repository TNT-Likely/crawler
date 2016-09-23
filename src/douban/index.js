import _request from '../../tools/request'
import _query from './query'

let index = 102
let list = () => {
  _request.visit(`http://www.dbmeinv.com/dbgroup/rank.htm?pager_offset=${index}`).then(info => {
    _query.douban(info).forEach(item => {
      _request.download(item.src, () => {
        console.log(`download success >>> page ${index} >>> ${item.src}`)
      })
    })
    index++
    list()
  })
}

list()