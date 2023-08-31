const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const url = 'https://www.teknosa.com/kampanyalar';
const agent = new https.Agent({
  rejectUnauthorized: false
});

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
};

axios.get(url, { headers, httpsAgent: agent })
.then(response => {
  const $ = cheerio.load(response.data);
  const promotions = [];

  $('.oppurtunities-tab').each((index, element) => {
    const img = $(element).find('.bnr-media img').attr('src');
    const product = $(element).find('.bnr-title').text();
    const link = 'https://www.teknosa.com' + $(element).find('.campaign-link').attr('href');
    const date = $(element).find('.campaign-discount-time').text();

    if (img && product && link && date) {
      promotions.push({
        img,
        product,
        link,
        date
      });
    }
  });

  console.log(promotions);
})
.catch(error => {
  console.error('Hata:', error);
});
