import { Icon } from "@rneui/themed";
import { Text, View } from "react-native";
import { mapUviValueToString } from "../utils";

const PUCard = ({ precipitation, uvIndex }) => {
  return (
    <View
      style={{
        marginTop: 30,
        width: "100%",
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "white",
        elevation: 8,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          gap: 20,
        }}
      >
        <Icon name="cloud-rain" type="feather" color="#338cff" />
        <View>
          <Text style={{ fontSize: 16, color: "gray" }}>Precipitation</Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            {precipitation}%
          </Text>
        </View>
      </View>
      <View
        style={{
          height: "70%",
          borderWidth: 0.2,
          borderColor: "gray",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          gap: 20,
        }}
      >
        <Icon name="sun-wireless" type="material-community" color="#338cff" />
        <View>
          <Text style={{ fontSize: 16, color: "gray" }}>UV Index</Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            {mapUviValueToString(uvIndex)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PUCard;
