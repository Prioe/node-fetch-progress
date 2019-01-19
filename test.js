const fetch = require("node-fetch");
const Progress = require("./src");

const link = "http://ipv6.download.thinkbroadband.com/200MB.zip";

async function run() {
  const response = await fetch(link);
  const progress = new Progress(response, { throttle: 100 });
  progress.on("progress", progress => {
    process.stdout.write(
      `${Math.floor(progress.progress * 100)}% - ${progress.doneh}/${
        progress.totalh
      } - ${progress.rateh} - ${progress.etah}                       \r`
    );
  });
  const result = await response.text();
  // console.log(result);
}

run();
