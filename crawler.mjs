import axios from 'axios';
import cheerio from "cheerio";
import fs from 'fs';

const urls = {
    'home': 'http://www.bufdays.com/',
    'roommate': 'http://www.bufdays.com/category.php?catid=192',
    'rent': 'http://www.bufdays.com/category.php?catid=41'
}

const pagesNum = 15;
const pages = Array.from({length: pagesNum}).fill(0).map((_, i) => {
    return urls.rent + '&page=' + (++i);
});
const allPostsUrl = [];

(async function () {
    for (let i = 0; i < pages.length; i++) {
        await axios
                .get(pages[i])
                .then(({ data }) => {
                    console.log(pages[i]);
                    let $ = cheerio.load(data);
                    $('.list_img .title').each((_, el) => {
                        allPostsUrl.push(el.attribs.href);
                    });
                });
        await new Promise((r,j) => setTimeout(() => r(), 500));
    }
    await fs.writeFile('allPostsUrl.json', JSON.stringify(allPostsUrl, null, '    '));
})();

// axios
//     .get(urls.rent)
//     .then(({ data }) => {
//         let $ = cheerio.load(data);
//         $('.list_img .title').each((_, el) => {
//             console.log(el.attribs.href)
//         });
//     })