const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');
const fs = require('fs');

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
    const resim = $(element).find('.bnr-media img').attr('src');
    const urun = $(element).find('.bnr-title').text();
    const link = 'https://www.teknosa.com' + $(element).find('.campaign-link').attr('href');
    const tarih = $(element).find('.campaign-discount-time').text();

    if (resim && urun && link && tarih) {
      promotions.push({
        resim,
        urun,
        link,
        tarih
      });
    }
  });

  // Verileri JSON dosyasına kaydet
  fs.writeFile('veri.json', JSON.stringify(promotions, null, 2), (err) => {
    if (err) {
      console.error('Hata:', err);
    } else {
      console.log('Veriler kaydedildi!');
    }
  });
})
.catch(error => {
  console.error('Hata:', error);
});
