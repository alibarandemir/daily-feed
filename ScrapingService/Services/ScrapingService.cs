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
                Console.WriteLine(url);
                // URL'den HTML içeriğini indir
                var response = await _httpClient.GetStringAsync(url);

               
                // HTML içeriğini yükle
                HtmlDocument htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(response);
               
               //rss kaynaklarına göre buraya xpath ekle
                string[] possibleSelectors= new string[]{
                    "//*div[@class='article-body']//p", //sozcu kontrol edilecek
                    "//*[@id='content']//p",    // article-body sınıfına sahip div içindeki p etiketleri evrimagaci
                };
                foreach(var selector in possibleSelectors){
                    var contentNodes= htmlDoc.DocumentNode.SelectNodes(selector);
                     if (contentNodes != null && contentNodes.Count > 0)
                    {
                        // İçeriği birleştirip döndür
                        string combinedContent = string.Join("\n", contentNodes.Select(node => node.InnerText.Trim()));
                        Console.WriteLine(combinedContent);
                        return combinedContent;
                    }
                }
                return "İçerik oluşturulamadı";
                
                
            }
            catch (Exception ex)
            {
                return $"Hata oluştu: {ex.Message}";
            }
        }
    }
}
