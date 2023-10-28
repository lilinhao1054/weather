import { Image, StyleSheet, Text, View } from "react-native";
import { getHour, parseIcon } from "../utils";

const VerticalHourCard = ({ dt, temp, icon }) => {
  return (
    <View style={styles.hour_card}>
      <Text>{getHour(dt)}</Text>
      <Image
        source={{ uri: parseIcon(icon) }}
        style={{ height: 40, width: 40 }}
      />
      <Text>{temp}°C</Text>
    </View>
  );
};

export default VerticalHourCard;

const styles = StyleSheet.create({
  hour_card: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 5,
    height: 140,
    width: 90,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
