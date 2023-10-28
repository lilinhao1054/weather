import { Image, Text, View } from "react-native";
import { getHour, parseIcon } from "../utils";

const HorizontalHourCard = ({ dt, temp, icon }) => {
  return (
    <View
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        backgroundColor: "white",
        elevation: 2,
        height: 50,
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Text style={{ flex: 6, fontSize: 18 }}>{getHour(dt)}</Text>
      <Text style={{ flex: 2, fontSize: 18 }}>{temp}°</Text>
      <Image
        source={{ uri: parseIcon(icon) }}
        style={{ width: 20, height: 40 }}
      />
    </View>
  );
};

export default HorizontalHourCard;
