using System;
using HtmlAgilityPack;

namespace ScrapingService.Services.Sources;

public class WebrazziScrapingStrategy:IScrapingStrategy
{
    public string extractContent(HtmlDocument htmlDoc)
    {
        var contentNodes = htmlDoc.DocumentNode.SelectNodes("/html/body/div[6]/div/div[1]/article/div[3]/div/div[2]/div[1]");
        return contentNodes != null ? string.Join("\n", contentNodes.Select(node => node.InnerText.Trim())) : "İçerik bulunamadı.";
    }
}
