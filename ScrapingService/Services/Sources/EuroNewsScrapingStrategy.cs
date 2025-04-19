using System;
using HtmlAgilityPack;

namespace ScrapingService.Services.Sources;

public class EuroNewsScrapingStrategy:IScrapingStrategy
{
    public string extractContent(HtmlDocument htmlDoc)
    {
        var contentNodes = htmlDoc.DocumentNode.SelectNodes("/html/body/div[3]/main/div[2]/div[1]/div[2]/article/div/div[1]/div[5]");
        return contentNodes != null ? string.Join("\n", contentNodes.Select(node => node.InnerText.Trim())) : "İçerik bulunamadı.";
    }
}
