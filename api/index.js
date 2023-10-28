export const fetchTodayWeather = async (coord) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${process.env.EXPO_PUBLIC_API_KEY}`
  );
  const responseJson = await response.json();
  return responseJson;
};

export const fetchPredictedWeather = async (coord) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=minutely,current&appid=${process.env.EXPO_PUBLIC_API_KEY}`
  );
  const responseJson = await response.json();
  return responseJson;
};

export const getCoord = async (cityName) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.EXPO_PUBLIC_API_KEY}`
  );
  const responseJson = await response.json();
  return responseJson.coord;
};
