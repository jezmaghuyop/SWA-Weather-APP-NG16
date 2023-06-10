import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserService, WeatherService } from './core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  userDetails: string = '';
  currentWeather: Record<string, any> = {};
  forecastWeather: Record<string, any> = {};

  userService: UserService = inject(UserService);
  weatherService: WeatherService = inject(WeatherService);

  private city: string = 'Oslo';
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getUserInfo();
    this.getCurrentWeather();
    this.getForecastWeather();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUserInfo(): void {
    this.subscription.add(
      this.userService.getUserDetails().subscribe((result: any) => {
        this.userDetails = result.userInfo;
      })
    );
  }

  getCurrentWeather(): void {
    this.subscription.add(
      this.weatherService
        .getCurrentWeather(this.city)
        .subscribe((result: any) => {
          this.currentWeather = result;
        })
    );
  }

  getForecastWeather(): void {
    this.subscription.add(
      this.weatherService
        .getForecastWeather(this.city)
        .subscribe((result: any) => {
          this.forecastWeather = result;
        })
    );
  }
}
