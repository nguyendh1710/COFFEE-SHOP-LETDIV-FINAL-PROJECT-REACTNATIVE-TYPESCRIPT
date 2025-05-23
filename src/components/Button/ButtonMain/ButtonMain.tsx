import React, { useRef, useEffect, useState } from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text,
  View,
  Animated,
} from "react-native";
import { customStyles } from "./ButtonMain.style";
import { useTheme } from "./../../../context/ThemeContext";
import { TypeOfTheme } from "../../../theme/themeTypes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Audio } from "expo-av";

type CustomButtonProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: "contained" | "outlined";
  size?: "small" | "medium" | "large" | "largeOnlyIcon";
  loading?: boolean;
  disabled?: boolean;
  hasIcon?: boolean; // Thêm prop để bật/tắt icon
  iconName?: string; // Tên icon (nếu có)
  iconPosition?: "start" | "end"; // Vị trí icon (trái/phải)
  style?: any; // Thêm style vào đây
};

export default function ButtonMain({
  children,
  onPress,
  variant = "contained",
  size = "medium",
  loading = false,
  disabled = false,
  hasIcon = false,
  iconName = "check", // Mặc định là icon "check"
  iconPosition = "start",
  style,
}: CustomButtonProps) {
  //

  const { theme } = useTheme();
  const styles = customStyles(theme as TypeOfTheme); // Đảm bảo kiểu theme là TypeOfTheme

  // state
  const [isProcessing, setIsProcessing] = useState(false);
  // hieu ung nhan nut 3d
  const scale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 1, // hiện glow
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 42,
        tension: 200,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 0, // tắt glow
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };
  // Sound effect
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../../assets/button-click-289742.mp3"), // dùng require thay vì uri
        { shouldPlay: true }
      );
      setSound(sound);
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Combined onPress
  // Combined onPress
  const handlePress = async () => {
    if (isProcessing || loading || disabled) return;

    setIsProcessing(true); // Khóa nút nếu tác vụ đang chạy tránh người dùng nhấn nhiều lần gây giảm hiệu suất

    try {
      await playSound(); // Phát âm thanh
      await onPress?.(); // Đợi hàm onPress hoàn thành (nếu là async)
    } catch (error) {
      console.error("Error in onPress:", error);
    } finally {
      setIsProcessing(false); // Mở khóa nút
    }
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      <View>
        {/* Glow layer */}
        <Animated.View
          style={[
            styles.glow,
            {
              opacity: glowOpacity,
              transform: [{ scale }],
              backgroundColor: theme.colors.primary,
            },
          ]}
        />

        {/* Nút chính */}
        <Animated.View
          style={[
            styles.button,
            {
              transform: [{ scale }],
              backgroundColor:
                variant === "contained" ? theme.colors.primary : "transparent",
              borderWidth: variant === "outlined" ? 2 : 0,
              borderColor: theme.colors.primary,
              opacity: disabled ? 0.6 : 1,
            },
            size === "large"
              ? styles.large
              : size === "small"
              ? styles.small
              : size === "largeOnlyIcon"
              ? styles.largeOnlyIcon
              : styles.medium,
            style,
          ]}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={variant === "contained" ? "#fff" : theme.colors.primary}
            />
          ) : (
            <View style={styles.contentWrapper}>
              {hasIcon && iconPosition === "start" && (
                <Ionicons
                  name={iconName}
                  size={20}
                  color="white"
                  style={styles.icon}
                />
              )}
              {children && <Text style={styles.text}>{children}</Text>}
              {hasIcon && iconPosition === "end" && (
                <Ionicons
                  name={iconName}
                  size={20}
                  color="white"
                  style={styles.icon}
                />
              )}
            </View>
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
