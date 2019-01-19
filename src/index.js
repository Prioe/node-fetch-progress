import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import addSeconds from 'date-fns/add_seconds'
import { throttle } from 'throttle-debounce'
import bytes from 'bytes'
import EventEmitter from 'events'

class Progress extends EventEmitter {
  constructor (response, options) {
    super()
    this.options = options || {}
    this.total = Number(response.headers.get('content-length'))
    this.done = 0
    this.startedAt = Date.now()

    const throttled = throttle(
      this.options.throttle || 0,
      this.onProgress.bind(this)
    )

    response.body.on('data', (chunk) => {
      this.done += chunk.length
      return throttled()
    })

    response.body.on('end', () => {
      this.onProgress()
      this.emit('finish')
    })
  }

  onProgress () {
    const totalh = bytes(this.total)
    const doneh = bytes(this.done)
    const elapsed = (Date.now() - this.startedAt) / 1000
    const rate = this.done / elapsed
    const rateh = `${bytes(rate)}/s`
    const estimated = this.total / rate
    const progress = this.done / this.total
    const eta = estimated - elapsed
    const etaDate = addSeconds(new Date(), eta)
    const etah = distanceInWordsToNow(etaDate, { includeSeconds: true })

    this.emit('progress', {
      total: this.total,
      done: this.done,
      totalh,
      doneh,
      startedAt: this.startedAt,
      elapsed,
      rate,
      rateh,
      estimated,
      progress,
      eta,
      etah,
      etaDate
    })
  }
}

module.exports = Progress
