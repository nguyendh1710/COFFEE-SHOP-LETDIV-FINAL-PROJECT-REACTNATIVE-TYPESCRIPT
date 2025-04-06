import { customStyles } from "./PaymentLoading.style";
import { useTheme } from "./../../context/ThemeContext";
import { ImageBackground,Image } from "react-native";

export default function PaymentLoading() {
  const { theme, toggleTheme } = useTheme();
  const styles = customStyles(theme); // Truyền theme vào customStyles

  return (
       
        <ImageBackground

             style={styles.background}
             resizeMode="cover"
           >
          {/* Logo */}
                  <Image
                    style={styles.logo}
                    source={{
                      uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/component/TransitionSuccess/b033f4c97648033801ece272d5d1f286.gif?raw=true",
                    
                    }}
                    alt="logo"
                  />
           </ImageBackground>
  );
}