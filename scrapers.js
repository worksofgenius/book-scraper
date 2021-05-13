const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [imgTxt] = await page.$x('//*[@id="imgBlkFront"]');
  const imgUrl = await imgTxt.getProperty('src');
  const cover = await imgUrl.jsonValue();

  const [titleTxt] = await page.$x('//*[@id="productTitle"]');
  const txt = await titleTxt.getProperty('textContent');
  const title = await txt.jsonValue();

  const [priceTxt] = await page.$x('//*[@id="price"]');
  const txt2 = await priceTxt.getProperty('textContent');
  const price = await txt2.jsonValue();

  console.log({cover, title, price});

  browser.close();
}

// Add url for desired book here
scrapeProduct('https://www.amazon.co.jp/-/en/Ryan-Mitchell/dp/1491985577/ref=sr_1_1?dchild=1&keywords=web+scraping&qid=1620886756&sr=8-1');
