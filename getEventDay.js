// linkで与えられたURLのページを取得して、その中のタイトルを取得

const axios = require("axios");
const cheerio = require("cheerio");

function getEventDay(link) {
  axios
    .get(link)
    .then((response) => {
      const page = cheerio.load(response.data);
      const pageTitle = page("div.titleArea").find("h3").text();
      console.log(`[${pageTitle}]\n`);
      page("div.dataArea").each((i, element) => {
        const eventTables = page(element).find("table");
        page(eventTables).each((i, table) => {
          eventTitle = page(table).find("th h4").text();
          eventContent = page(table).find("td p");
          eventPlace = page(eventContent).first().text();
          eventOverview = page(eventContent).last().text();
          console.log(`${eventTitle}\n`);
          console.log(`${eventPlace}\n`);
          console.log(`${eventOverview}\n`);
        });
        console.log("==================================================\n");
      });
    })
    .catch(console.error);
}

module.exports = getEventDay;
