import * as Location from "expo-location";

export const parseIcon = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

export const parseTime = (dt) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const utcDate = new Date(dt * 1000);
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    utcDate
  );
  return formattedDate;
};

export const getWeekday = (dt) => {
  const options = {
    weekday: "short",
  };
  const utcDate = new Date(dt * 1000);
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    utcDate
  );
  return formattedDate;
};

export const getHour = (dt) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const utcDate = new Date(dt * 1000);
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    utcDate
  );
  return formattedDate;
};

export const mapUviValueToString = (uvi) => {
  let uvIndex;
  if (uvi <= 2) {
    return (uvIndex = "Low");
  } else if (uvi <= 5) {
    return (uvIndex = "Medium");
  } else if (uvi <= 7) {
    return (uvIndex = "High");
  } else if (uvi <= 10) {
    return (uvIndex = "Very High");
  } else if (uvi >= 11) {
    return (uvIndex = "Extreme");
  } else {
    uvIndex = "Unknown";
  }
  return uvIndex;
};

export const getLocalLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({
        timeInterval: 1000,
      });
      return {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      };
    } else {
      console.log("Location permission denied");
    }
  } catch (error) {
    console.error(error);
  }
};
