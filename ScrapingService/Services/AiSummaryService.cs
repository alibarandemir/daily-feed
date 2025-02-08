using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace ScrapingService.Services
{
    public class AiSummaryService : IAiSummaryService
    {
        public async Task<string> GenerateSummaryAsync(string content)
        {
            try
            {
                DotNetEnv.Env.Load();
                
                string key = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY");
                var url = "https://05200-m5030utp-swedencentral.cognitiveservices.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-08-01-preview";

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("api-key", key);

                    var requestBody = new
                    {
                        messages = new[]
                        {
                            new { role = "system", content = "Kullanıcıların aradığı bilgiyi bulmasına yardımcı olan bir yapay zeka yardımcısısınız." },
                            new { role = "user", content = content }
                        },
                       
                        temperature = 0.7,
                        top_p = 0.95,
                        frequency_penalty = 0,
                        presence_penalty = 0,
                        max_tokens = 800,
                        stop = (string)null
                    };

                    var json = JObject.FromObject(requestBody).ToString();
                    var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

                    var response = await client.PostAsync(url, httpContent);
                    response.EnsureSuccessStatusCode();

                    var responseContent = await response.Content.ReadAsStringAsync();
                    var responseObject = JObject.Parse(responseContent);
                    var summary= responseObject["choices"][0]["message"]["content"].ToString();
                    Console.WriteLine(summary);
                    return summary;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return $"Hata oluştu: {ex.Message}";
            }
        }
    }
}
