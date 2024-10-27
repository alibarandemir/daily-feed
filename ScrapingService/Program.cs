using ScrapingService.Services;

var builder = WebApplication.CreateBuilder(args);

// Servislerin eklenmesi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddScoped<IAiSummaryService, AiSummaryService>();
builder.Services.AddScoped<IScrapingService,MyScrapingService>();
builder.Services.AddScoped<ISummaryService, SummaryService>();

var app = builder.Build();

// HTTP istek hattının yapılandırılması
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    options.RoutePrefix = string.Empty; // Kök URL'yi SwaggerUI ile eşleştirir
});
Console.WriteLine("selam");
// API uç noktasının eklenmesi
app.MapControllers();

app.Run();
