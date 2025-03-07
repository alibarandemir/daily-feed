

using HtmlAgilityPack;

public interface IScrapingStrategy{
    string extractContent(HtmlDocument htmlDoc);
}