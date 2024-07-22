const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.teknosa.com/kampanyalar';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const campaigns = [];

    $('div.0-category-0').each((index, element) => {
      const urun = $(element).find('div.criv-title-inner').text().trim();
      const resim = $(element).find('img.lazy').attr('data-srcset');
      const tarih = $(element).find('div.cri-info b').text().trim();
      const link = $(element).find('a.criv-inner').attr('href');

      campaigns.push({
        urun,
        resim,
        tarih,
        link: `https://www.teknosa.com${link}`
      });
    });

    fs.writeFile('veri.json', JSON.stringify(campaigns, null, 2), (err) => {
      if (err) {
        console.error('Hata:', err);
        return;
      }
      console.log('Veriler veri.json dosyasına kaydedildi.');
    });
  })
  .catch(error => {
    console.error('Hata:', error);
  });
