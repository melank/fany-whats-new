const axios = require("axios");
const cheerio = require("cheerio");
const getEventDay = require("./getEventDay");

const url = "https://yoshimoto.funity.jp/calendar/fukuokagekijyo/";

async function main() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let monthlyEvents = [];

    await Promise.all(
      $("div.calendarPurchase")
        .map(async (i, element) => {
          const link = $(element).find("a").attr("href");
          if (link) {
            const todayEvent = await getEventDay(url + link);
            monthlyEvents.push(todayEvent);
          }
        })
        .get()
    );

    monthlyEvents.map((event) => {
      const date = Object.keys(event)[0];
      const formattedDate =
        date.replace(/-/g, "年").replace(/^(\d+年\d+)/, "$1") + "日のイベント";

      console.log("====================================");
      console.log(formattedDate);

      // イベントの詳細を表示
      event[date].forEach((detail) => {
        console.log("\n" + detail.title.trim()); // タイトルを表示
        console.log(detail.place); // 会場を表示
        console.log("詳細");
        console.log(detail.overvore); // 詳細情報を表示
      });
    });
  } catch (error) {
    console.error(error);
  }
}

main();
