using System;
using System.Threading.Tasks;
using DotNetEnv;
using OpenAI.Chat;
using ScrapingService.Services;

public class AiSummaryService : IAiSummaryService
{
    public async Task<string> GenerateSummaryAsync(string content)
    {
        // .env dosyasını yükle
        Env.Load();

        // OpenAI API anahtarını al
        var key = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
        if (string.IsNullOrEmpty(key))
        {
            Console.WriteLine("API key hatalı veya eksik!");
            return "API key is missing or incorrect.";
        }

        // OpenAI ChatClient oluştur (Doğru modeli kullan)
        ChatClient client = new(model: "gpt-4-turbo", key); // veya "gpt-3.5-turbo"
        
        try
        {
            // OpenAI'ye özetleme için istek gönder
            ChatCompletion completion = await client.CompleteChatAsync(
                $"Lütfen aşağıdaki metni kısa bir şekilde özetle:\n\n{content}"
            );
            Console.WriteLine("Özetlenmeden önce içerik"+" "+completion.Content);
            
            // OpenAI'den dönen cevabı ekrana yazdır
            Console.WriteLine("Özetlenen Metin: ");
            Console.WriteLine(completion.Content[0].Text);

            // Özetlenen metni döndür
            return completion.Content[0].Text;
        }
        catch (Exception ex)
        {
            Console.WriteLine("Hata oluştu: " + ex.Message);
            return null;
        }
    }
}
