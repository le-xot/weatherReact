import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Flex,
  Progress,
  Heading
} from '@chakra-ui/react'

export const App = () => {
  const [weather, setWeather] = useState()
  const [{ lat, long }, setCoords] = useState({
    lat: 0,
    long: 0
  })

  useEffect(() => {
    getCurrentPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (lat && long) {
      getWeatherByCoords()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long])

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      console.log('getCurrentPosition', coords)

      setCoords({
        lat: coords.latitude,
        long: coords.longitude
      })
    })
  }

  const getWeatherByCoords = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_WEATHER_KEY}&lang=ru&units=metric&lat=${lat}&lon=${long}`
    )

    const data = await response.json()
    console.log('getWeatherByCoords', data)
    setWeather(data)
  }

  // const getWeatherByCity = async (query) => {
  //   const response = await fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_WEATHER_KEY}&lang=ru&units=metric&q=${query}`
  //   )
  //   const data = await response.json()
  //   console.log('getWeatherByCity', data)
  //   setWeather(data)
  // }

  if (!weather) {
    return (
      <Flex justify="center" align="center" h="full" >
        <Progress pos="absolute" w="full" top={0} size="xs" isIndeterminate />
        <Heading>Loading...</Heading>
      </Flex>
    )
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        Weather App
      </Grid>
    </Box>
  )
}