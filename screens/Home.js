import { Button, Icon, SearchBar, Skeleton } from "@rneui/themed";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import PagerView from "react-native-pager-view";
import VerticalHourCard from "../components/VerticalHourCard";
import PUCard from "../components/PUCard";
import SevenDayCard from "../components/SevenDayCard";
import DetailCard from "../components/DetailCard";
import { getLocalLocation, parseIcon, parseTime } from "../utils";
import { fetchPredictedWeather, fetchTodayWeather, getCoord } from "../api";

const Home = ({ route, navigation }) => {
  const [active, setActive] = useState(0);
  const handlePageSelected = (e) => {
    setActive(e.nativeEvent.position);
  };

  const [todayWeather, setTodayWeather] = useState();
  const [predictedWeather, setPredictedWeather] = useState();

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const ref = useRef();

  const handleSearch = () => {
    navigation.navigate("home", { search });
    ref.current.clear();
    setLoading(true);
  };

  const cityName = route.params?.search;

  useEffect(() => {
    const init = async () => {
      let coord;
      if (cityName) coord = await getCoord(cityName);
      else coord = await getLocalLocation();
      const res = await Promise.all([
        fetchTodayWeather(coord),
        fetchPredictedWeather(coord),
      ]);
      setTodayWeather(res[0]);
      setPredictedWeather(res[1]);
    };

    init().then(() => setLoading(false));
  }, [
    cityName,
    getCoord,
    getLocalLocation,
    fetchTodayWeather,
    fetchPredictedWeather,
    setTodayWeather,
    setPredictedWeather,
  ]);

  return (
    <SafeAreaView>
      <View>
        <SearchBar
          disabled={loading}
          round
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
            padding: 20,
          }}
          inputContainerStyle={{
            backgroundColor: "white",
            elevation: 20,
          }}
          onChangeText={(text) => setSearch(text)}
          value={search}
          ref={ref}
          searchIcon={
            <Button
              icon={{ name: "search" }}
              onPress={handleSearch}
              buttonStyle={{
                borderRadius: 20,
                backgroundColor: "white",
                width: 35,
              }}
              containerStyle={{ width: 35 }}
              iconContainerStyle={{ width: 20 }}
              loading={loading}
              loadingStyle={{ backgroundColor: "gray", borderRadius: 20 }}
            />
          }
        />
        {loading ? (
          <View style={styles.page_box}>
            <Skeleton animation="wave" width="100%" height={40} />
            <Skeleton animation="wave" width="100%" height={20} />
            <Skeleton animation="wave" width="100%" height={60} />
            <Skeleton animation="wave" width="100%" height={30} />
            <Skeleton animation="wave" width="100%" height={30} />
            <Skeleton
              animation="wave"
              width="100%"
              height={80}
              style={{ marginTop: 30 }}
            />
            <Skeleton
              animation="wave"
              width="100%"
              height={30}
              style={{ marginTop: 30 }}
            />
            <View style={styles.next_three_hour_box}>
              <Skeleton animation="wave" width={80} height={160} />
              <Skeleton animation="wave" width={80} height={160} />
              <Skeleton animation="wave" width={80} height={160} />
            </View>
          </View>
        ) : (
          <>
            <View style={styles.indicator_box}>
              <View
                style={
                  active === 0 ? styles.indicator_active : styles.indicator
                }
              />
              <View
                style={
                  active === 1 ? styles.indicator_active : styles.indicator
                }
              />
            </View>
            <PagerView
              initialPage={0}
              style={styles.pageView}
              onPageSelected={handlePageSelected}
            >
              <View key="1">
                <View style={styles.page_box}>
                  <View style={styles.location_box}>
                    <Icon name="location-outline" type="ionicon" />
                    <Text style={{ fontSize: 24, fontWeight: 500 }}>
                      {todayWeather.name}
                    </Text>
                  </View>
                  <Text style={styles.time_box}>
                    {parseTime(todayWeather.dt)}
                  </Text>
                  <View style={styles.now_temp_box}>
                    <Image
                      source={{
                        uri: parseIcon(todayWeather.weather[0].icon),
                      }}
                      style={{ width: 70, height: 70 }}
                    />
                    <Text
                      style={{ fontSize: 40, fontWeight: 500 }}
                    >{`${todayWeather.main.temp}°C`}</Text>
                  </View>
                  <Text style={{ fontSize: 20, marginTop: 10 }}>
                    {`${todayWeather.main.temp_min}°/${todayWeather.main.temp_max}° Feels like ${todayWeather.main.feels_like}°`}
                  </Text>
                  <Text style={{ fontSize: 20, marginTop: 10 }}>
                    {todayWeather.weather[0].description}
                  </Text>
                  <PUCard
                    precipitation={(
                      predictedWeather.daily[0].pop * 100
                    ).toFixed(0)}
                    uvIndex={predictedWeather.daily[0].uvi}
                  />
                  <View style={styles.next_three_hour_box}>
                    <Text style={{ fontSize: 20, fontWeight: 500 }}>
                      Next 3 Hours
                    </Text>
                    <Text
                      style={{ fontSize: 16, color: "#338cff" }}
                      onPress={() =>
                        navigation.navigate("hour", {
                          next24Data: predictedWeather.hourly,
                        })
                      }
                    >
                      See More
                    </Text>
                  </View>
                  <View style={styles.vertical_hour_card_box}>
                    <VerticalHourCard
                      dt={predictedWeather.hourly[0].dt}
                      temp={predictedWeather.hourly[0].temp}
                      icon={predictedWeather.hourly[0].weather[0].icon}
                    />
                    <VerticalHourCard
                      dt={predictedWeather.hourly[1].dt}
                      temp={predictedWeather.hourly[1].temp}
                      icon={predictedWeather.hourly[1].weather[0].icon}
                    />
                    <VerticalHourCard
                      dt={predictedWeather.hourly[2].dt}
                      temp={predictedWeather.hourly[2].temp}
                      icon={predictedWeather.hourly[2].weather[0].icon}
                    />
                  </View>
                </View>
              </View>
              <View key="2">
                <View style={styles.page_box}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      width: "100%",
                      marginBottom: 30,
                    }}
                  >
                    Next 7 Days
                  </Text>
                  <SevenDayCard
                    todayData={{
                      temp: todayWeather.main.temp,
                      status: todayWeather.weather[0].main,
                      icon: todayWeather.weather[0].icon,
                    }}
                    next7Data={predictedWeather.daily}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      width: "100%",
                      marginTop: 30,
                    }}
                  >
                    Today Details
                  </Text>
                  <View style={styles.detail_card_box}>
                    <DetailCard
                      description="Humidity"
                      result={`${todayWeather.main.humidity}%`}
                      icon={{
                        name: "water-percent",
                        type: "material-community",
                      }}
                    />
                    <DetailCard
                      description="Wind"
                      result={`${todayWeather.wind.speed}km/h`}
                      icon={{ name: "wind", type: "feather" }}
                    />
                    <DetailCard
                      description="Feels Like"
                      result={`${todayWeather.main.feels_like}°C`}
                      icon={{
                        name: "temperature-celsius",
                        type: "material-community",
                      }}
                    />
                    <DetailCard
                      description="Pressure"
                      result={`${todayWeather.main.pressure}hPa`}
                      icon={{
                        name: "arrow-down-circle-sharp",
                        type: "ionicon",
                      }}
                    />
                  </View>
                </View>
              </View>
            </PagerView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  pageView: {
    width: "100%",
    height: "100%",
  },
  indicator: {
    height: 6,
    width: 6,
    backgroundColor: "gray",
    borderRadius: 3,
  },
  indicator_active: {
    height: 6,
    width: 15,
    backgroundColor: "#338cff",
    borderRadius: 3,
  },
  indicator_box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  page_box: { alignItems: "center", padding: 20 },
  vertical_hour_card_box: {
    marginTop: 35,
    flexDirection: "row",
    gap: 20,
  },
  location_box: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  time_box: {
    color: "gray",
    marginTop: 10,
  },
  now_temp_box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 10,
  },
  next_three_hour_box: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  detail_card_box: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
});
