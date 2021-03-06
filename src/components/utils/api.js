const PLANETS_URL = 'https://swapi.co/api/planets/';

const get = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    let data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const getPlanets = () => get(PLANETS_URL);

/*const api = {
    key: '&key=4e4006dc280346f9ab2a2471ffc67574',
    //currentWeatherLink : 'https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=',
    two_day_hourly_link: 'https://api.weatherbit.io/v2.0/forecast/hourly?city=',
    five_day_link: 'https://api.weatherbit.io/v2.0/forecast/3hourly?city=',
    daily_link: 'https://api.weatherbit.io/v2.0/forecast/daily?city=', // 16 Day Forecast
    metric: '&units=M',
    fahrenheit: '&units=I',
    scientific: '&units=S'
  };
  
  const API_KEY = '&key=4e4006dc280346f9ab2a2471ffc67574';
  
  const get = async url => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  };
  
  export const getCurrentForecast = city =>
    get(CURRENT_FORECAST_URL + city + UNITS + API_KEY);
  export const getDailyForecast = city =>
    get(DAILY_FORECAST_URL + city + UNITS + API_KEY);
  export const getForecast = city =>
    Promise.all([getCurrentForecast(city), getDailyForecast(city)]);
  
  const search = () => {
    fetch(
      settings.weather_link + this.user_search + settings.temperature + api.key
    )
      .then(x => {
        if (x.status === 204) errors.notFound();
        else if (x.status === 429) errors.apiLimit();
        else return x.json();
      })
      .then(weather => {
        if (!weather) return;
        else {
          this.data = weather;
          this.render(weather);
          favorite.checkCityInList();
          favorite.checkEmptyList();
        }
      })
      .catch(err => console.log('Fetch Error :', err));
  };
  */
