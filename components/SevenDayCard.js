import { Text, View, ScrollView, Image } from "react-native";
import { getWeekday, parseIcon } from "../utils";

const SevenDayCard = ({ todayData, next7Data }) => {
  const SmallDayCard = ({ dt, status, icon }) => {
    return (
      <View style={{ alignItems: "center", gap: 10, marginRight: 10 }}>
        <Text style={{ fontSize: 16 }}>{getWeekday(dt)}</Text>
        <Image
          source={{ uri: parseIcon(icon) }}
          style={{ width: 40, height: 30 }}
        />
        <Text style={{ fontSize: 16 }}>{status}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        elevation: 5,
        width: "100%",
        height: 250,
        padding: 20,
        gap: 20,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 16 }}>Today</Text>
          <Text style={{ fontSize: 36, fontWeight: 500 }}>
            {todayData.temp}°
          </Text>
          <Text style={{ fontSize: 16 }}>{todayData.status}</Text>
        </View>
        <Image
          source={{ uri: parseIcon(todayData.icon) }}
          style={{ width: 80, height: 80 }}
        />
      </View>
      <ScrollView
        horizontal
        indicatorStyle="white"
        showsHorizontalScrollIndicator={false}
      >
        {next7Data?.map((item) => (
          <SmallDayCard
            key={item.dt}
            dt={item.dt}
            icon={item.weather[0].icon}
            status={item.weather[0].main}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SevenDayCard;
