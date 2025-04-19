import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: false }],
      ['enclosure', 'enclosure', { keepArray: false }], 
      ['thumbnail', 'thumbnail', { keepArray: false }],
      ['image','image',{keepArray:false}],
      ['content','content',{keepArray:true}]
    ]
  }
});

export const fetchRssFeeds = async (rssUrl: string) => {
  console.log("Fetching RSS feed from URL:", rssUrl);

  try {
    const feed = await parser.parseURL(rssUrl);

    const news = feed.items.slice(0, 3).map((item) => {
      // Farklı etiketleri kontrol ederek resim URL'sini al
      const imageUrl = item.mediaContent?.$.url || 
                       item.enclosure?.url || 
                       item.thumbnail?.url ||
                       item.image|| // 'thumbnail' etiketinden al
                       item.content||
                       "";
      console.log(item.content);
      return {
        title: item.title || "",
        link: item.link || "",
        description: item.contentSnippet || "",
        image: imageUrl || "",
      };
    });

    return news;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
};
