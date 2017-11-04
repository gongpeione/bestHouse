import axios from 'axios';
import cheerio from "cheerio";

const urls = {
    'home': 'http://www.bufdays.com/',
    'roommate': 'http://www.bufdays.com/category.php?catid=192',
    'rent': 'http://www.bufdays.com/category.php?catid=41'
}

const pagesNum = 2;
const pages = Array.from({length: pagesNum}).fill(0).map((_, i) => {
    return urls.rent + '&page=' + (++i);
});
const allPostsUrl = [];

const postsUrl = pages.map((url) => {
    axios
        .get(url)
        .then(({ data }) => {
            let $ = cheerio.load(data);
            const list = [];
            $('.list_img .title').each((_, el) => {
                allPostsUrl.push(el.attribs.href);
            });
        });
});

// axios
//     .get(urls.rent)
//     .then(({ data }) => {
//         let $ = cheerio.load(data);
//         $('.list_img .title').each((_, el) => {
//             console.log(el.attribs.href)
//         });
//     })