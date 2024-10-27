using System;

namespace ScrapingService.Services;

public interface IScrapingService
{
    Task<string> GetNewsContentAsync(string url);
}
