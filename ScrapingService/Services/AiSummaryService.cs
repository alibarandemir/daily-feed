using System;
using OpenAI.Chat;

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
        ChatClient client = new(model: "gpt-4o", apiKey: Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
        ChatCompletion completion = client.CompleteChat("Say 'this is a test.'");
        Console.WriteLine(completion);

        return "dd";
    }
}
