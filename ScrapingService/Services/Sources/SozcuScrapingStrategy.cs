using System;
using HtmlAgilityPack;

namespace ScrapingService.Services.Sources;

public class SozcuScrapingStrategy:IScrapingStrategy
{
    public string extractContent(HtmlDocument htmlDoc)
    {
        var contentNodes = htmlDoc.DocumentNode.SelectNodes("/html/body/div[4]/div[4]/div/div[2]/article/div[2]/div/div[1]");
        return contentNodes != null ? string.Join("\n", contentNodes.Select(node => node.InnerText.Trim())) : "İçerik bulunamadı.";
    }
}
