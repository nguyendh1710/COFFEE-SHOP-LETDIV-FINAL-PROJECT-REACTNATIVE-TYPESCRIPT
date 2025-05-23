import React, { useRef, useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text,
  View,
  Animated,
  StyleSheet,
} from "react-native";
import { customStyles } from "./FloatButton.style";
import { useTheme } from "../../../context/ThemeContext";
import { TypeOfTheme } from "../../../theme/themeTypes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

type CustomButtonProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: "contained" | "outlined";
  size?: "small" | "medium" | "large" | "largeOnlyIcon";
  loading?: boolean;
  disabled?: boolean;
  hasIcon?: boolean;
  iconName?: string;
  iconPosition?: "start" | "end";
  style?: any;
};

export default function FloatButton({
  children,
  onPress,
  variant = "contained",
  size = "medium",
  loading = false,
  disabled = false,
  hasIcon = false,
  iconName = "check",
  iconPosition = "start",
}: CustomButtonProps) {
  const { theme } = useTheme();
  const styles = customStyles(theme as TypeOfTheme);

  const scale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const shockWaveScale = useRef(new Animated.Value(0)).current;
  const shockWaveOpacity = useRef(new Animated.Value(0.6)).current;

  // 3D touch effect
  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 1,
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
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Pulse animation loop
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  // Shockwave loop
  useEffect(() => {
    const shockwave = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(shockWaveScale, {
            toValue: 3,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(shockWaveScale, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(shockWaveOpacity, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(shockWaveOpacity, {
            toValue: 0.6,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    shockwave.start();
    return () => shockwave.stop();
  }, []);

  // Sound effect
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../../assets/button-click-289742.mp3"),
        { shouldPlay: true }
      );
      setSound(sound);
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  const handlePress = () => {
    playSound();
    onPress?.();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      <View>
        {/* Shockwave gradient layer */}
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [{ scale: shockWaveScale }],
              opacity: shockWaveOpacity,
              zIndex: -10,
              borderRadius: 999,
            },
          ]}
        >
          <LinearGradient
            colors={["#8cd291", "#00fbff", "#245b13"]}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.9 }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 50,
            }}
          />
        </Animated.View>

        {/* Glow */}
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
