import React, { useState } from "react"
import styled from "@emotion/styled"

import { ReactComponent as CloudyIcon } from './images/day-cloudy.svg'
import { ReactComponent as DayThunderstorm } from './images/day-thunderstorm.svg';
import { ReactComponent as DayClear } from './images/day-clear.svg';
import { ReactComponent as DayCloudyFog } from './images/day-cloudy-fog.svg';
import { ReactComponent as DayCloudy } from './images/day-cloudy.svg';
import { ReactComponent as DayFog } from './images/day-fog.svg';
import { ReactComponent as DayPartiallyClearWithRain } from './images/day-partially-clear-with-rain.svg';
import { ReactComponent as DaySnowing } from './images/day-snowing.svg';
import { ReactComponent as NightThunderstorm } from './images/night-thunderstorm.svg';
import { ReactComponent as NightClear } from './images/night-clear.svg';
import { ReactComponent as NightCloudyFog } from './images/night-cloudy-fog.svg';
import { ReactComponent as NightCloudy } from './images/night-cloudy.svg';
import { ReactComponent as NightFog } from './images/night-fog.svg';
import { ReactComponent as NightPartiallyClearWithRain } from './images/night-partially-clear-with-rain.svg';
import { ReactComponent as NightSnowing } from './images/night-snowing.svg';

const IconContainer = styled(CloudyIcon)`
  flex-basis: 30%;
  svg {
    max-height: 110px;
  }
`;

const weatherTypes = {
    isThunderstorm:[200,201,202,210,211],
    isDrizzle:[300,301,302,310,311],
    isRain:[500,501,502,503,504,521,520],
    isSnow:[600,601,602,611,612,613,615],
    isAtmosphere:[701,711,721,731,741,751,761],
    isClear:[800],
    isClouds:[801,802,803,804],
} // weather.id
const weatherIcons = {
  day: {
    isThunderstorm: <DayThunderstorm />,
    isClear: <DayClear />,
    isClouds: <DayCloudy />,
    isAtmosphere: <DayFog />,
    isDrizzle: <DayPartiallyClearWithRain />,
    isSnow: <DaySnowing />,
  },
  night: {
    isThunderstorm: <NightThunderstorm />,
    isClear: <NightClear />,
    isClouds: <NightCloudy />,
    isAtmosphere: <NightFog />,
    isDrizzle: <NightPartiallyClearWithRain />,
    isSnow: <NightSnowing />,
  },
};

const currentWeatherId = 800

const weatherId2Type = (weatherId) => {
    return Object.entries(weatherTypes).reduce(
        (currentWeatherType, [weatherType, weatherIds]) => {
            if (weatherIds.includes(Number(weatherId))) {
                return weatherType
            } else return currentWeatherType
        }, ''
    )
}

console.log(weatherId2Type(currentWeatherId))

const WeatherIcon = ({ currentWeatherId, moment }) => {
    const [currentWeatherIcon, setCurrentWeatherIcon] = useState("isClear")
  return (
    <IconContainer> 
    { weatherIcons[moment][currentWeatherIcon] }
      <CloudyIcon/>
    
    </IconContainer>
  )
}

export default WeatherIcon