
function search(key) {
    return GET("https://truyen.tangthuvien.net/tim-kiem?keyword=" + encodeURIComponent(key)).then(res => {
        let doc = HTML.parse(res);
        let items = doc.select(".list-story > li");
        return items.map(item => ({
            name: item.selectFirst("h3.story-title > a").text(),
            link: item.selectFirst("h3.story-title > a").attr("href"),
            cover: item.selectFirst("img.story-thumb").attr("src"),
            description: item.selectFirst(".story-excerpt").text()
        }));
    });
}

function detail(url) {
    return GET(url).then(res => {
        let doc = HTML.parse(res);
        let info = doc.selectFirst(".story-info");
        let catalog = doc.select(".chapter-list a").map(chap => ({
            name: chap.text(),
            link: chap.attr("href")
        }));
        return {
            name: info.selectFirst("h1.story-name").text(),
            cover: doc.selectFirst(".story-cover img").attr("src"),
            author: info.selectFirst(".author-name").text(),
            description: doc.selectFirst(".story-description").text(),
            catalog: catalog
        };
    });
}

function content(url) {
    return GET(url).then(res => {
        let doc = HTML.parse(res);
        return doc.selectFirst(".chapter-content").html();
    });
}
