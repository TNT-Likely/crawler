import * as _queue from './queue'

for (var i = 162; i < 822; i++) {
  _queue.douban.push(`http://www.dbmeinv.com/dbgroup/rank.htm?pager_offset=${i}`, () => {
    console.log(`<<< page ${i} download success >>>`)
  })
}
