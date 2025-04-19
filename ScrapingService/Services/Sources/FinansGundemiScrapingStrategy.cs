using System;
using HtmlAgilityPack;

namespace ScrapingService.Services.Sources;

public class FinansGundemiScrapingStrategy:IScrapingStrategy
{
    public string extractContent(HtmlDocument htmlDoc)
    {
        var contentNodes = htmlDoc.DocumentNode.SelectNodes("/html/body/div[3]/div[3]/div[2]/div[7]");
        return contentNodes != null ? string.Join("\n", contentNodes.Select(node => node.InnerText.Trim())) : "İçerik bulunamadı.";
    }
}
