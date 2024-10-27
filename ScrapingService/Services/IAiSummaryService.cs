using System;

namespace ScrapingService.Services;

public interface IAiSummaryService
{
    Task<string> GenerateSummaryAsync(string content);
}
