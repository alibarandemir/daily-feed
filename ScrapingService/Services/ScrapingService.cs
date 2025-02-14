using System;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace ScrapingService.Services
{
    public class MyScrapingService : IScrapingService
    {
        private readonly HttpClient _httpClient;

        public MyScrapingService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<string> GetNewsContentAsync(string url)
        {
            try
            {
                // URL'den HTML içeriğini indir
                var response = await _httpClient.GetStringAsync(url);
                
                // HTML içeriğini yükle
                HtmlDocument htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(response);

                // XPath ile id="content" olan div içindeki p etiketlerini seç
                var contentNodes = htmlDoc.DocumentNode.SelectNodes("//*[@id='content']//p");

                if (contentNodes != null && contentNodes.Count > 0)
                {
                    // İçeriği birleştirip döndür
                    string combinedContent = string.Join("\n", contentNodes.Select(node => node.InnerText.Trim()));
                    return combinedContent;
                }

                return "İçerik bulunamadı.";
            }
            catch (Exception ex)
            {
                return $"Hata oluştu: {ex.Message}";
            }
        }
    }
}
