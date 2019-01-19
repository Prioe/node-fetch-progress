const fetch = require('node-fetch')
const Progress = require('./dist')

const link = 'http://ipv6.download.thinkbroadband.com/200MB.zip'

async function run () {
  const response = await fetch(link)
  const progress = new Progress(response, { throttle: 100 })
  progress.on('progress', (p) => {
    process.stdout.write(
      `${Math.floor(p.progress * 100)}% - ${p.doneh}/${p.totalh} - ${
        p.rateh
      } - ${p.etah}                       \r`
    )
  })
  const result = await response.text()
  // console.log(result);
}

run()
