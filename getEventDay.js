// linkで与えられたURLのページを取得して、その中のタイトルを取得

const axios = require("axios");
const cheerio = require("cheerio");

function getEventDay(link) {
  axios
    .get(link)
    .then((response) => {
      const events = cheerio.load(response.data);
      const title = events("div.titleArea").find("h3").text();
      console.log(title);
    })
    .catch(console.error);
}

module.exports = getEventDay;
