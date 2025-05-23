import React, { useRef, useEffect } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  Text,
  KeyboardTypeOptions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { customStyles } from "./Input.style";
import { useTheme } from "../../context/ThemeContext";
import { TypeOfTheme } from "../../theme/themeTypes";

type CustomInputProps = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  defaultValue?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  hasIcon?: boolean;
  rightIcon?: React.ReactNode;
  iconName?: string | string[];
  iconPosition?: "start" | "end";
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  style?: any;
  error?: string;
  testID?: string;
  onSubmitEditing?: () => void;
  onSearch?: (searchTerm: string) => void;
  onIconPress?: () => void;
  value?: string;
};

export default function Input({
  placeholder = "Enter text",
  onChangeText,
  onSubmitEditing,
  size = "medium",
  disabled = false,
  loading = false,
  hasIcon = false,
  rightIcon,
  iconName = "lock-closed",
  iconPosition = "start",
  secureTextEntry = false,
  keyboardType,
  label,
  style,
  testID,
  onSearch,
  onIconPress,
  defaultValue = "",
  value,
}: CustomInputProps) {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const styles = customStyles(theme as TypeOfTheme, size, disabled);

  useEffect(() => {
    if (inputRef.current && defaultValue) {
      inputRef.current.setNativeProps({ text: defaultValue });
    }
  }, [defaultValue]);

  const handleChangeText = (text: string) => {
    onChangeText?.(text);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (onSearch) {
      debounceTimeout.current = setTimeout(() => {
        onSearch(text);
      }, 1000);
    }
  };

  const handleIconPress = () => {
    if (onIconPress) {
      inputRef.current?.blur();
      onIconPress();
    }
  };

  const renderIcons = () => {
    if (!hasIcon) return null;
    const icons = Array.isArray(iconName) ? iconName : [iconName];
    return icons.map((name, idx) => (
      <React.Fragment key={idx}>
        {idx !== 0 && <View style={styles.separator} />}
        <Ionicons
          name={name}
          size={18}
          color="#888"
          style={styles.icon}
          onPress={handleIconPress}
        />
      </React.Fragment>
    ));
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <>
            {hasIcon && iconPosition === "start" && renderIcons()}
            <TextInput
              ref={inputRef}
              style={[
                styles.input,
                size === "large"
                  ? styles.large
                  : size === "small"
                  ? styles.small
                  : styles.medium,
                disabled && { opacity: 0.6 },
              ]}
              onChangeText={handleChangeText}
              onSubmitEditing={onSubmitEditing}
              placeholder={placeholder}
              placeholderTextColor={disabled ? "#d3d3d3" : "#888"}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              editable={!disabled}
              testID={testID}
              defaultValue={defaultValue}
              value={value}
            />
            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            {hasIcon && iconPosition === "end" && renderIcons()}
          </>
        )}
      </View>
    </View>
  );
}
