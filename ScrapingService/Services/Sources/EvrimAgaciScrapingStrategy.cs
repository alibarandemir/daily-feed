
using HtmlAgilityPack;

public class EvrimAgaciScrapingStrategy : IScrapingStrategy
{
    public string extractContent(HtmlDocument htmlDoc)
    {
        var contentNodes = htmlDoc.DocumentNode.SelectNodes("//*[@id='content']//p");
        return contentNodes != null ? string.Join("\n", contentNodes.Select(node => node.InnerText.Trim())) : "İçerik bulunamadı.";
    }
}