import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { customStyles } from "./Dropdown.style";

type DropdownItem = {
  label: string;
  value: string; // phai dat ten key nay co dinh la value de dropdow xu ly
  icon?: string; // icon name hoặc image URL
  isImage?: boolean; // true nếu là ảnh
};

type CustomDropdownProps = {
  items: DropdownItem[];
  onSelect: (value: string) => void;
  selectedValue: string | null;
  placeholder?: string;
  iconColor?: string;
};

export default function Dropdown({
  items,
  onSelect,
  selectedValue,
  placeholder = "Chọn mục...",
  iconColor = "#444",
}: CustomDropdownProps) {

  const { theme } = useTheme();
  const styles = customStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);

  const selectedItem = items.find((i) => i.value === selectedValue);

  return (
    <View>
      {/* Dropdown button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        {selectedItem?.icon && selectedItem.isImage ? (
          <Image
            source={{ uri: selectedItem.icon }}
            style={styles.itemIconImage}
          />
        ) : selectedItem?.icon ? (
          <Ionicons
            name={selectedItem.icon}
            size={20}
            color={iconColor}
            style={styles.itemIcon}
          />
        ) : null}
        <Text style={styles.dropdownText}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      {/* Modal with options */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item.value);
                    setModalVisible(false);
                  }}
                >
                  {item.isImage && item.icon ? (
                    
                    <Image
                      source={{ uri: item.icon }}
                      style={styles.itemIconImage}
                    />
                  ) : item.icon ? (
                    <Ionicons
                      name={item.icon}
                      size={30}
                      color={iconColor}
                      style={styles.itemIcon}
                    />
                  ) : null}
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
