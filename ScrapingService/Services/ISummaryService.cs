using System;

namespace ScrapingService.Services;

public interface ISummaryService
{
    Task<string> GetSummaryAsync(string rssLink);
}
