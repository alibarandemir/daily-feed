using Microsoft.AspNetCore.Mvc;
using ScrapingService.Services;

[ApiController]
[Route("api/[controller]")]
public class SummaryController : ControllerBase
{
    private readonly ISummaryService _summaryService;

    public SummaryController(ISummaryService summaryService)
    {
        _summaryService = summaryService;
    }

    [HttpGet("getSummary")]
    public async Task<IActionResult> GetSummary([FromQuery] string newsUrl)
    {
        if (string.IsNullOrEmpty(newsUrl))
        {
            return BadRequest("RSS link gerekli");
        }
        
        try
        {
            
            var summary = await _summaryService.GetSummaryAsync(newsUrl);
            if(summary==null || summary=="İçerik bulunamadı"){
                return Ok(new { message = "Özet bulunamadı" });
            }
            return Ok(new { message = "Özet başarıyla alındı", summary });
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, $"Bir hata oluştu: {ex.Message}");
        }
    }
}
