import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';  // Sử dụng thư viện AirbnbRating
import { useTheme } from './../../context/ThemeContext';
import { TypeOfTheme } from '../../theme/themeTypes';
import { customStyles } from "./Rating.style";

export default function Rating() {
  const [rating, setRating] = useState(3);

  // Hàm xử lý khi người dùng chọn rating mới
  const ratingCompleted = (newRating: number) => {
    setRating(newRating);
    // console.log("Rating is: " + newRating); // Nếu bạn muốn log giá trị rating
  };

  const { theme } = useTheme();
  const styles = customStyles(theme as TypeOfTheme);

  return (
    <View style={styles.container}>
      <AirbnbRating
        count={5}  // Số sao tối đa
        showRating={false}  // Không hiển thị các bình luận cho mỗi sao
        defaultRating={rating}  // Rating mặc định
        size={14}  // Kích thước sao
        onFinishRating={ratingCompleted}  // Hàm gọi khi người dùng chọn rating
      />
    </View>
  );
};
