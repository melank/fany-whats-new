const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://yoshimoto.funity.jp/calendar/fukuokagekijyo";

axios
  .get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    let linkArray = [];

    // divタグ内のリンクを取得
    $("div.calendarPurchase").each((i, element) => {
      const link = $(element).find("a").attr("href");
      // 予定があればリンクのボタンが表示されてるので、そのURLを配列に追加
      if (link) {
        linkArray.push(link);
      }
    });

    console.log(linkArray);
  })
  .catch(console.error);