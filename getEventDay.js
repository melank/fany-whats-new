// linkで与えられたURLのページを取得して、その中のタイトルを取得

const cheerio = require("cheerio");

async function getEventDay(link) {
  try {
    const todayEvents = {};
    const response = await fetch(link);
    const data = await response.text();

    const page = cheerio.load(data);
    const pageTitle = page("div.titleArea").find("h3").text();
    const dateString = pageTitle.substring(0, pageTitle.indexOf("日") + 1);

    const currentYear = new Date().getFullYear();
    const date = `${currentYear}-${dateString
      .replace("月", "-")
      .replace("日", "")}`;

    page("div.dataArea").each((i, element) => {
      const eventTables = page(element).find("table");
      page(eventTables).each((i, table) => {
        // イベントの内容
        eventContent = page(table).find("td p");
        eventObject = {
          title: page(table).find("th h4").text(),
          place: page(eventContent).first().text(),
          overvore: page(eventContent).last().text(),
        };
        if (todayEvents[date]) {
          // 日付に対するエントリがすでに存在する場合、イベントを配列に追加
          todayEvents[date].push(eventObject);
        } else {
          // 日付に対するエントリがまだ存在しない場合、新しい配列を作成してイベントを追加
          todayEvents[date] = [eventObject];
        }
      });
    });

    return todayEvents;
  } catch {
    console.error;
  }
}

module.exports = getEventDay;
