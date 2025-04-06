import React from "react";
import { View, Text,Image } from "react-native";
import { styles } from "./StatusBar.style";






export default function StatusBar() {

 
 // Định nghĩa interface trực tiếp trong component
 interface LogoProps {
  source: { uri: string };
}

// Tạo một đối tượng theo interface LogoProps
const logoProps: LogoProps = {
  source: { uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b5e60f61489a24678012e7f48f6954fce6db79261c4faaf3883b3004f38e63e2?placeholderIfAbsent=true&apiKey=8cf726bd15044deb901dee42a95b28fe' },
};
  
  const time = new Date().toLocaleTimeString();


  return (
    <View style={styles.statusBarContainer}>
      <Text style={styles.statusBarText}>{time}</Text>
      
     
      <Image
      resizeMode="contain"
      source={logoProps.source}
      style={styles.logoImage}
    />


    </View>
  );
}
