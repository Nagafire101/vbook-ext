
function search(key) {
    return GET("https://rungtruyen.com/tim-kiem?tu-khoa=" + encodeURIComponent(key)).then(res => {
        let doc = HTML.parse(res);
        let items = doc.select(".book-item");
        return items.map(item => ({
            name: item.selectFirst(".book-title").text(),
            link: item.selectFirst("a").attr("href"),
            cover: item.selectFirst("img").attr("src"),
            description: item.selectFirst(".text-nowrap").text()
        }));
    });
}

function detail(url) {
    return GET(url).then(res => {
        let doc = HTML.parse(res);
        let info = doc.selectFirst(".book-info");
        let catalog = doc.select(".list-chapter li a").map(chap => ({
            name: chap.text(),
            link: chap.attr("href")
        }));
        return {
            name: info.selectFirst("h1").text(),
            cover: doc.selectFirst(".book-cover img").attr("src"),
            author: info.selectFirst(".author").text(),
            description: info.selectFirst(".book-intro").text(),
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
