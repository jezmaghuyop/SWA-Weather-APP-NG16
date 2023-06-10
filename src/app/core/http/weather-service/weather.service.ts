import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http: HttpClient = inject(HttpClient);

  constructor() {}

  getCurrentWeather(city: string): Observable<string> {
    return this.http.post<string>(
      `${environment.api.weather}/api/weather/current`,
      { City: city }
    );
  }

  getForecastWeather(city: string): Observable<string> {
    return this.http.post<string>(
      `${environment.external.weather}?key=${environment.external.apikey}&q=${city}&days=5&aqi=no&alerts=no`,
      { City: city }
    );
  }
}
