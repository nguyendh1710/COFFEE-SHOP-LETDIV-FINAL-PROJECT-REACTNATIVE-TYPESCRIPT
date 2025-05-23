import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "../../context/ThemeContext";
import { customStyles } from "./CusModal.style";
import { LinearGradient } from "expo-linear-gradient"; // hoặc 'react-native-linear-gradient'
import Ionicons from "react-native-vector-icons/Ionicons";

type CusModalProps = {
  visible: boolean;
  editing?: boolean;
  onClose?: () => void;
  title?: string;
  message?: string;
};

export default function CusModal({
  visible,
  editing = false,
  onClose,
  title = "Chúc mừng bạn!",
  message,
}: CusModalProps) {
  //

  const { theme } = useTheme();
  const styles = customStyles(theme);
  // Nếu không truyền message thì mặc định sẽ dùng 2 câu dưới
  const defaultMessage = editing
    ? "Cập nhật sản phẩm thành công!"
    : "Thêm sản phẩm thành công!";

  return (
    <Modal
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={200}
      animationOutTiming={150}
      backdropTransitionInTiming={150}
      backdropTransitionOutTiming={100}
      backdropOpacity={0.4}
      useNativeDriver
      hideModalContentWhileAnimating
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ justifyContent: "center", alignItems: "center" }} // tránh delay vì layout
    >
      <LinearGradient
        colors={["#e0ce74", "#dde38c", "#e0ce74"]}
        style={styles.container}
      >
        <Ionicons name="checkmark-circle-outline" size={60} color="#4caf50" />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message ?? defaultMessage}</Text>
      </LinearGradient>
    </Modal>
  );
}
