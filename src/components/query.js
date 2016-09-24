import cheerio from 'cheerio'

export default {
  'douban': (body) => {
    let $ = cheerio.load(body)
    let obj = []
    $('.thumbnails .thumbnail').map((i, item) => {
      obj.push({
        link: $(item).find('a.link').attr('href'),
        src: $(item).find('img.height_min').attr('src')
      })
    })
    return obj
  }
}
