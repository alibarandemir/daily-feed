using System;

namespace ScrapingService.Services;

public class AiSummaryService : IAiSummaryService
{
    private readonly HttpClient _httpClient;
    public AiSummaryService(){
        _httpClient= new HttpClient();
    }
    public async Task<string> GenerateSummaryAsync(string content)
    {
        var prompt= $"Lütfen bu metni 200 karakterle özetle:{content}";
        return "dd";
    }
}
