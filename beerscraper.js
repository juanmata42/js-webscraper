import { load } from 'cheerio';
import request from 'request';
import fs from 'fs';

const storeData = (data) => {
  try {
    fs.writeFileSync('./beers.json', JSON.stringify(data), { flag: 'a+' });
  } catch (err) {
    console.error(err);
  }
};

export default function beerScraper(urlList) {
  const beers = [];
  for (let i = 0; i < urlList.length; i++) {
    let data = [];
    const url = urlList[i];
    request(url, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        let $ = load(body);
        let name = $('.product-detail-name').text();
        data.push(name);
        let description = '';
        $('.product-description p').each(function (i, e) {
          const str = $(this).text();
          description = description + str;
        });
        data.push(description);
        $('.value').each(function (i, e) {
          const str = $(this).text();
          data.push(str);
        });
        let beerObject = {
          name: data[0],
          origin: data[3],
          description: data[1],
          alcoholContent: data[4],
          fermentationType: data[7],
          color: data[10],
          malts: data[8],
          hops: data[9],
          website: '',
        };
        beers.push(beerObject);
      }
      console.log(beers);
      storeData(beers);
    });
  }
}
