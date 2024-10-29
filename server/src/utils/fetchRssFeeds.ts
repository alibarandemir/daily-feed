import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: false }], // 'media:content' alanını 'mediaContent' olarak adlandıracağız
    ]
  }
});

export const fetchRssFeeds = async (rssUrl: string) => {
  console.log("Fetching RSS feed from URL:", rssUrl);
  
  try {
    const feed = await parser.parseURL(rssUrl);

    const news = feed.items.slice(0,3).map((item) => {
      const imageUrl = item.mediaContent && item.mediaContent.$ ? item.mediaContent.$.url : "";     
      return {
        title: item.title||"",
        link: item.link||"",
        description: item.contentSnippet||"",
        image: imageUrl||"", 
      };
    });

    return news;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
};
