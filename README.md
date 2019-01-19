# node-fetch-progress

Get updates on download progress using `fetch`.

## Install

Using `yarn`

```sh
yarn add node-fetch-progress
```

Using `npm`

```sh
npm install node-fetch-progress --save
```

## Usage

```js
const response = await fetch(link)
const progress = new Progress(response, { throttle: 100 })
progress.on('progress', (p) => {
  console.log(
    p.total,
    p.done,
    p.totalh,
    p.doneh,
    p.startedAt,
    p.elapsed,
    p.rate,
    p.rateh,
    p.estimated,
    p.progress,
    p.eta,
    p.etah,
    p.etaDate
  )
})
```
