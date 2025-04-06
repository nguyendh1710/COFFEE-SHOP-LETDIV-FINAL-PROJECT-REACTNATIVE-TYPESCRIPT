import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,LogBox 
} from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./src/context/ThemeContext"; 

import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from "@expo-google-fonts/inter";
import Input from "./src/components/Input/Input";
import ButtonMain from "./src/components/Button/ButtonMain/ButtonMain";
import PaymentLoading from "./src/components/PaymentLoading/PaymentLoading";
import Intro from "./src/screens/Intro/Intro";
import PaymentSuccess from "./src/screens/Payment/PaymentSuccess/PaymentSuccess";
import Payment from "./src/screens/Payment/Payment";
import Home from "./src/screens/Home/Home";
import SignIn from "./src/screens/Auth/SignIn/SignIn";
import SignUp from "./src/screens/Auth/SignUp/SignUp";
import ProductItem from "./src/screens/Home/ProductItem/ProductItem";
import Rating from "./src/components/Rating/Rating";



export default function App() {
  // const Stack = createNativeStackNavigator();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
// Tắt tất cả cảnh báo start
LogBox.ignoreAllLogs(true);
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        {/* <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} /> 
           <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer> */}
        {/* <Input/> */}
        {/* <PaymentLoading/> */}
        {/* <ButtonMain size={"large"}>xem</ButtonMain> */}
        {/* <Intro/> */}
        {/* <PaymentSuccess/> */}
        {/* <Payment/> */}
        {/* <Home/> */}
        {/* <SignIn/> */}
        {/* <SignUp/> */}
        {/* <ProductItem/> */}
        {/* <Rating/> */}
        <Home/>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16, 
    paddingTop: 24, // tạo khoảng trên khi cuộn trang
    paddingBottom: 4, // tạo khoảng dưới khi cuộn trang
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
