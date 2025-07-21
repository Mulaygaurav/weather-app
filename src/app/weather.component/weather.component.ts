import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';  // Adjust path if needed
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any = null;

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (!this.city) return;

    this.weatherService.getWeather(this.city).subscribe({
      next: (data: any) => {
        this.weatherData = {
          city: data.location.name,
          temperature: data.current.temp_c,
          description: data.current.condition.text,
          humidity: data.current.humidity,
          wind: data.current.wind_kph,
          icon: this.getWeatherEmoji(data.current.condition.text.toLowerCase()),
          emoji: this.getWeatherIcon(data.current.condition.text.toLowerCase()),
        };
      },
      error: (err: any) => {
        console.error('Error fetching weather:', err);
        this.weatherData = null;
      }
    });
  }

  getWeatherIcon(condition: string): string {
    switch (condition) {
      case 'clear': return '☀️';
      case 'clouds': return '☁️';
      case 'rain': return '🌧️';
      case 'thunderstorm': return '⛈️';
      case 'snow': return '❄️';
      case 'mist':
      case 'fog': return '🌫️';
      default: return '✨';
    }
  }

  getWeatherEmoji(condition: string): string {
    switch (condition) {
      case 'clear': return '🌞';
      case 'clouds': return '🌤️';
      case 'rain': return '🌦️';
      case 'thunderstorm': return '🌩️';
      case 'snow': return '🌨️';
      case 'mist':
      case 'fog': return '🌁';
      default: return '✨';
    }
  }
}
