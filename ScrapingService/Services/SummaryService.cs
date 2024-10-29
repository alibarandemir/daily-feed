using System;

namespace ScrapingService.Services;

public class SummaryService:ISummaryService
{   
    private readonly IAiSummaryService _aiSummaryService;
    private readonly IScrapingService _scrapingService;
    public SummaryService(IScrapingService scrapingService, IAiSummaryService aiSummaryService){
        _scrapingService= scrapingService;
        _aiSummaryService=aiSummaryService;
    }

    public async Task<string?> GetSummaryAsync(string url){
        
        var newsContent = await _scrapingService.GetNewsContentAsync(url);
        Console.WriteLine(newsContent);
          // İçerik bulunamamışsa uygun bir mesaj döndür
            if (string.IsNullOrWhiteSpace(newsContent) || newsContent == "İçerik oluşturulamadı")
            {
                return null;
            }
        
        var summary = await _aiSummaryService.GenerateSummaryAsync(newsContent);
        return summary;
    }
}