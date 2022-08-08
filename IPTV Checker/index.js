const checker = require("iptv-checker");
const fs = require("fs");
const myArgs = process.argv.slice(2);
const argsObj = {};
myArgs.forEach((arg) => {
  const a = arg.split("=");
  argsObj[a[0]] = a[1];
});

// console.log(argsObj);

const a = new checker({});
let notWorkingList = [];

a.checkPlaylist("./List to check.m3u").then((results) => {
  results.items.forEach((result) => {
    if (!result.status.ok) {
      notWorkingList.push(result.name);
    }
  });
  console.log(notWorkingList);
  let file = fs.createWriteStream("results.txt");
  file.on("error", function (err) {
    console.log("Sorry, there was an error writing to file.");
    console.log(err);
  });
  file.write(notWorkingList.join("\n"));
  file.end();
});
