using System;
using HtmlAgilityPack;

namespace ScrapingService.Services.Sources;

public class CumhuriyetScrapingStrategy : IScrapingStrategy
{
    public string extractContent(HtmlDocument htmlDoc)
    {
        var contentNodes = htmlDoc.DocumentNode.SelectNodes("/html/body/main/div[1]/div[3]/div[2]/div[1]/div[9]//p");
        return contentNodes != null ? string.Join("\n", contentNodes.Select(node => node.InnerText.Trim())) : "İçerik bulunamadı.";
    }
}
