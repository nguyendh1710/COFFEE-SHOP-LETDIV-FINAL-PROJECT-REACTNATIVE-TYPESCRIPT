import { customStyles } from "./SigninLoading.style";
import { useTheme } from "./../../context/ThemeContext";
import { ImageBackground,Image } from "react-native";

export default function SigninLoading() {
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
                      uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/component/LoadingSuccess/ae5effdf6e0b842d405743066a093150.gif?raw=true",
                    }}
                    alt="logo"
                  />
           </ImageBackground>
  );
}