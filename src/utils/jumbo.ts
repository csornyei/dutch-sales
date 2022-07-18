import puppeteer, { Page, ElementHandle } from "puppeteer";

export async function getJumboSales() {
  const url = "https://www.jumbo.com/aanbiedingen/alles";
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
    );
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const acceptButton = await page.$("button#onetrust-accept-btn-handler");
    await acceptButton?.click();

    const results: any[] = [];

    const toggleButtons = await page.$$(".jum-promotion-toggle>button");
    let i = 0;
    for (const button of toggleButtons) {
      if (i !== 0) continue;
      else i += 1;
      await button.click();
      await autoScroll(page);

      const promotionCards = await page.$$(
        "div.jum-card-grid.jum-card-grid-promotion>div"
      );

      for (const card of promotionCards) {
        const image = await (
          await (await card.$("img"))?.getProperty("src")
        )?.jsonValue();
        const tag = await getTextContent(card, "span.jum-tag");
        const title = await getTextContent(card, "h3.jum-heading.title");
        const subtitle = await getTextContent(card, "h4.jum-heading.subtitle");
        const information = await getTextContent(card, ".information");
        const dates = information
          .split(title)
          .filter((s: string) => s.includes("t/m"))[0];
        const [from, until] = dates.split("t/m");

        results.push({
          image,
          tag,
          title,
          subtitle,
          from: from ? from.trim() : "",
          until: until ? until.trim() : "",
        });
      }
    }

    return results;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve(null);
        }
      }, 50);
    });
  });
}

async function getTextContent(parent: ElementHandle, selector: string) {
  const el = await parent.$(selector);
  const textContent = await el?.getProperty("textContent");
  const text = await textContent?.jsonValue();
  return typeof text === "string" ? text : "";
}

export async function getJumboSalesMock() {
  return JSON.parse(
  );
}
