import React, { Component } from 'react';
import axios from 'axios';

class WeatherApp extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      weatherData: null,
    };
    this.apiKey = 'bc58db13a8de7d95a722b532297669fd'; 
  }

  getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.apiKey}&units=metric`
      );
      this.setState({ weatherData: response.data });
    } catch (error) {
      console.error('Помилка при отриманні даних погоди', error);
    }
  };

  render() {
    return (
      <div>
        <h1>Погода</h1>
        <input
          type="text"
          placeholder="Введіть назву міста"
          value={this.state.city}
          onChange={(e) => this.setState({ city: e.target.value })}
        />
        <button onClick={this.getWeatherData}>Отримати погоду</button>
        {this.state.weatherData && (
          <div>
            <h2>Погода в місті {this.state.weatherData.name}</h2>
            <p>Температура: {this.state.weatherData.main.temp}°C</p>
            <p>Вологість: {this.state.weatherData.main.humidity}%</p>
            <p>Опис: {this.state.weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default WeatherApp;
