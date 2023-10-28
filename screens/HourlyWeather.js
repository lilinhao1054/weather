import { ScrollView } from "react-native";
import HorizontalHourCard from "../components/HorizontalHourCard";

const HourlyWeather = ({ route }) => {
  const data = route.params.next24Data;

  return (
    <ScrollView style={{ padding: 10, marginBottom: 10 }}>
      {data.map((item) => (
        <HorizontalHourCard
          key={item.dt}
          dt={item.dt}
          temp={item.temp}
          icon={item.weather[0].icon}
        />
      ))}
    </ScrollView>
  );
};

export default HourlyWeather;
