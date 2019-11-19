import React from 'react';

import Info from './components/info'; 
import Form from './components/form'; 
import Weather from './components/weather';

const API_KEY =  "72cc0718b1782ba6cdf633aaf399f43d";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) =>{ 
    e.preventDefault();
    const city = e.target.elements.city.value;
    if(city){
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await api_url.json();
      let sunset = data.sys.sunset;
      let sunrise = data.sys.sunrise;
      let date_set = new Date();
      let date_rise = new Date();
      date_set.setTime(sunset);
      date_rise.setTime(sunrise);
      let sunset_date = date_set.getHours() + ":" + date_set.getMinutes() + ":" + date_set.getSeconds();
      let sunrise_date = date_rise.getHours() + ":" + date_rise.getMinutes() + ":" + date_rise.getSeconds();
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunrise: sunrise_date,
        sunset: sunset_date,
        error: undefined
      });
    }else{
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Enter the name of city"
      });  
    }

  }
    render() {
      return (<div className="wrapper"> 
      <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-sm-5 info"><Info/></div>
          <div className="col-sm-7 form">   <Form weatherMethod = {this.gettingWeather}/>
          <Weather 
            temp = {this.state.temp}
            city = {this.state.city}
            country = {this.state.country}
            sunrise = {this.state.sunrise}
            sunset = {this.state.sunset}
            error = {this.state.error}
          /></div>
        </div>
        </div>
        </div>
        </div>);
    }
}

    export default App;