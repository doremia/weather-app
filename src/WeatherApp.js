import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled'

import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RedoIcon } from "./images/refresh.svg";
import WeatherIcon from "./WeatherIcon"

const Container = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  background-color: #f9f9f9;
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: ${props => (props.theme === "dark" ? "#dadada" : "#212121")};
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: #828282;
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: #757575;
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Redo = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: #828282;
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;


const WeatherApp = () => {
  console.log("---invoke function component---");

  const [currentWeather, setCurrentWeather] = useState({
    observationTime: new Date(),
    location: "",
    description: "",
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    tempmax: 0,
    tempmin: 0
  });

  const fetchData = useCallback(()=> {
    const fetchingData = async() => {
      const [currentWeather, forecast]=await Promise.all([
        fetchCurrentWeather(),
        fetchForecast()
      ])
      setCurrentWeather({
        ...currentWeather,
        ...forecast
      })
    }
    fetchingData()
  },[])
  
  useEffect(() => {
    console.log("execute useEffect");
    fetchData()
  }, [fetchData]);

  const fetchCurrentWeather = () => {
    return fetch(
      "https://api.openweathermap.org/data/2.5/weather?id=5391959&APPID=504cc437ea5aa8f957d6bcf4c6799831"
    )
      .then(res => res.json())
      .then(data => {
        let date = new Date();
        const locationData = {
          description: data.weather[0].main,
          observationTime: date.toISOString(data.timezone),
          location: data.name,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
          temperature: data.main.temp
        };
        console.log("Promise for current", data);
          return {
            ...locationData
          };
      });
  };

  const fetchForecast = () => {
    return fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=37.77&lon=-122.42&exclude=hourly,current,minutely&appid=504cc437ea5aa8f957d6bcf4c6799831"
    )
      .then(res => res.json())
      .then(data => {
        const forecastData = {
          tempmax: data.daily[0].temp.max,
          tempmin: data.daily[0].temp.min
        };
        console.log(data);
        
          return {
            ...forecastData
          };

      });
  };

  return (
    <Container>
      {console.log("render")}
      <WeatherCard>
        <Location>{currentWeather.location}</Location>
        <Description>
          {currentWeather.description}{" "}
          {Math.round(((currentWeather.tempmin - 273.15) * 9) / 5 + 32)}{" "}
          {Math.round(((currentWeather.tempmax - 273.15) * 9) / 5 + 32)}
        </Description>
        <CurrentWeather>
          <Temperature>
            {Math.round(
              ((currentWeather.temperature - 273.15) * 9) / 5 + 32,
              -1
            )}{" "}
            <Celsius>°F</Celsius>
          </Temperature>
          <WeatherIcon />
        </CurrentWeather>
        <AirFlow>
          <AirFlowIcon />
          {currentWeather.windSpeed} m/s
        </AirFlow>
        <Rain>
          <RainIcon />
          {currentWeather.humidity} %
        </Rain>

        <Redo
          onClick={fetchData}>
          Obtained data at: {" "}
          {new Intl.DateTimeFormat("en-US").format(
            new Date(currentWeather.observationTime)
          )}
          <RedoIcon />
        </Redo>
      </WeatherCard>
    </Container>
  );
}

export default WeatherApp;
