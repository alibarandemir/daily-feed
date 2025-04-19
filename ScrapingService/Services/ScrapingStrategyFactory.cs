using System;
using HtmlAgilityPack;
using ScrapingService.Services.Sources;

namespace ScrapingService.Services;

public class ScrapingStrategyFactory
{
    public static IScrapingStrategy GetStrategy(string url)
    {
        if (url.Contains("cnn.com"))
        {
            return new EvrimAgaciScrapingStrategy();
        }
        else if(url.Contains("cumhuriyet.com")){
            return new CumhuriyetScrapingStrategy();
        }
        else if(url.Contains("finansingundemi.com")){
            return new FinansGundemiScrapingStrategy();
        }
        else if(url.Contains("sozcu.com.tr")){
            return new SozcuScrapingStrategy();
        }
        else if(url.Contains("tr.euronews.com")){
            return new EuroNewsScrapingStrategy();
        }
        else if(url.Contains("webrazzi.com")){
            return new WebrazziScrapingStrategy();
        }
        else
        {
            return new DefaultScrapingStrategy(); // Varsayılan bir scraping yöntemi
        }
    }
}

public class DefaultScrapingStrategy : IScrapingStrategy
{
    public string extractContent(HtmlDocument htmlDoc)
    {
        var contentNodes = htmlDoc.DocumentNode.SelectNodes("//*[@id='content']//p");
        return contentNodes != null ? string.Join("\n", contentNodes.Select(node => node.InnerText.Trim())) : "İçerik bulunamadı.";
    }

  
}
