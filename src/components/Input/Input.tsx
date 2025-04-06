import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { customStyles } from "./Input.style";
import { useTheme } from './../../context/ThemeContext';
import { TypeOfTheme } from '../../theme/themeTypes';

type CustomInputProps = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  hasIcon?: boolean;
  iconName?: string | string[]; // 1 hoặc nhiều icon;
  iconPosition?: 'start' | 'end';
  secureTextEntry?: boolean;
  style?: any;
  error?: string;
  testID?: string;
};

export default function Input({
  placeholder = 'Enter text',
  onChangeText,
  value,
  size = 'medium',
  disabled = false,
  loading = false,
  hasIcon = false,
  iconName = 'lock-closed',
  iconPosition = 'start',
  secureTextEntry = false,
  style,
  testID,
}: CustomInputProps) {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState(value || '');

  const handleChangeText = (text: string) => {
    setInputValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const styles = customStyles(theme as TypeOfTheme, size, disabled);

  // cho phep them nhieu icon
  const renderIcons = () => {
    if (!hasIcon) return null;

    const icons = Array.isArray(iconName) ? iconName : [iconName];

    return icons.map((name, idx) => (
      <React.Fragment key={idx}>
        {idx !== 0 && <View style={styles.separator} />}
        <Ionicons name={name} size={18} color="#888" style={styles.icon} />
      </React.Fragment>
    ));
  };
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.inputWrapper}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <>
            {hasIcon && iconPosition === 'start' && renderIcons()}
            <TextInput
              style={[styles.input, size === "large" ? styles.large : size === "small" ? styles.small : styles.medium,
                disabled && { opacity: 0.6 }] }
              value={inputValue}
              onChangeText={handleChangeText}
              placeholder={placeholder}
              editable={!disabled}
              secureTextEntry={secureTextEntry}
              placeholderTextColor={disabled ? '#d3d3d3' : '#888'}
              testID={testID}
            />
            {hasIcon && iconPosition === 'end' && renderIcons()}
          </>
        )}
      </View>
    </View>
  );
}


