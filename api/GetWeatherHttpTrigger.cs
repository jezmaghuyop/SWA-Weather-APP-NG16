using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

namespace Weather.API
{
  public class GetWeatherHttpTrigger
  {
    private readonly HttpClient _httpClient;

    public GetWeatherHttpTrigger(HttpClient httpClient)
    {
      this._httpClient = httpClient;
    }

    [FunctionName("GetWeatherHttpTrigger")]
    public async Task<IActionResult> Run(
       [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "weather/current")] HttpRequest req,
        ILogger log)
    {
      var apiUrl = Environment.GetEnvironmentVariable("Kv_Weather_API_Url", EnvironmentVariableTarget.Process);
      var apiKey = Environment.GetEnvironmentVariable("Kv_Weather_API_Key", EnvironmentVariableTarget.Process);

      log.LogInformation($"apiUrl: {apiUrl}");
      log.LogInformation($"apiKey: {apiKey}");

      WeatherPayload request = null;
      WeatherResponse response = null;

      using (StreamReader reader = new StreamReader(req.Body, Encoding.UTF8))
      {
        request = JsonConvert.DeserializeObject<WeatherPayload>(await reader.ReadToEndAsync());
      }

      try
      {
        var endpoint = $"{apiUrl}/v1/current.json?key={apiKey}&q={request.City}&aqi=no";

        log.LogInformation($"requesting to {endpoint}");

        var result = await this._httpClient.GetAsync(endpoint);

        if (result.IsSuccessStatusCode)
        {
          var responseStr = await result.Content.ReadAsStringAsync();
          response = JsonConvert.DeserializeObject<WeatherResponse>(responseStr);
        }
      }
      catch (Exception ex)
      {
        log.LogError(ex, $"{ex.Message}");
        throw;
      }

      return new OkObjectResult(response);
    }
  }
}