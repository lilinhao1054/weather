import { Icon } from "@rneui/themed";
import { Text, View } from "react-native";

const DetailCard = ({ description, result, icon }) => {
  return (
    <View
      style={{
        width: 152,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "white",
        elevation: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 15,
      }}
    >
      <Icon name={icon.name} type={icon.type} color="#338cff" size={30} />
      <View>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>{result}</Text>
        <Text style={{ color: "gray" }}>{description}</Text>
      </View>
    </View>
  );
};

export default DetailCard;
