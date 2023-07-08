const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://yoshimoto.funity.jp/calendar/fukuokagekijyo/";

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
        axios
          .get(url + link)
          .then((response) => {
            const el = cheerio.load(response.data);
            const title = el("div.titleArea").find("h3").text();
            console.log(title);
          })
          .catch(console.error);
      }
    });
  })
  .catch(console.error);
