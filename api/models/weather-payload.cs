using Newtonsoft.Json;
public class WeatherPayload
{
    [JsonProperty("city")]
    public string City { get; set; }
}