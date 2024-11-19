using System;
using OpenAI.Chat;
using DotNetEnv;

namespace ScrapingService.Services;

public class AiSummaryService : IAiSummaryService
{
    private readonly HttpClient _httpClient;
    public AiSummaryService(){
        _httpClient= new HttpClient();
        
    }
    public async Task<string> GenerateSummaryAsync(string content)

    {
        try{
             DotNetEnv.Env.Load();
        var prompt= $"Lütfen bu metni 200 karakterle özetle:{content}";
        ChatClient client = new(model: "gpt-3.5-turbo", apiKey: Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
        ChatCompletion completion = client.CompleteChat(prompt);
        Console.WriteLine(completion);

        return "dd";
        }
       
        catch (Exception ex)
            {
                return $"Hata oluştu: {ex.Message}";
            }
    }
}
