import { StyleSheet } from 'react-native';
import { TypeOfTheme } from '../../../theme/themeTypes';

export const customStyles = (theme:TypeOfTheme) => StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8, // Scale bo góc
    paddingVertical: 12, // Scale theo chiều dọc
    paddingHorizontal: 24, // Scale theo chiều ngang
  },
  contentWrapper:{
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 12, // Scale font chữ
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    marginHorizontal: 5, // Scale khoảng cách ngang
  },
  glow: {
    position: 'absolute',
    top: -10,
    bottom: -10,
    left: -10,
    right: -10,
    borderRadius: 999,
    zIndex: -1,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8, // Android glow
  },
  
  small: {
    width: 120, // Scale chiều rộng
    height:30,
    paddingLeft:24,
    paddingRight:24,
    paddingTop:4,
    paddingBottom:8,
    borderRadius:theme.radius.radiusXl,
    backgroundColor: theme.colors.enableButton,
    paddingVertical: 14,
    paddingHorizontal: 30,

    elevation: 4, // Bóng đổ Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6, // Bóng đổ iOS
  },
  medium: {
    width: 140,
    height:30,
    paddingLeft:24,
    paddingRight:24,
    paddingTop:8,
    paddingBottom:8,
    borderRadius:theme.radius.radiusXl,
    backgroundColor: theme.colors.enableButton,
    paddingVertical: 14,
    paddingHorizontal: 30,

    elevation: 4, // Bóng đổ Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6, // Bóng đổ iOS
  },
  large: {
    width: 166,
    height:40,
    paddingLeft:24,
    paddingRight:24,
    paddingTop:8,
    paddingBottom:8,
    borderRadius:50,
    backgroundColor: theme.colors.enableButton,
    paddingVertical: 14,
    paddingHorizontal: 30,
    elevation: 4, // Bóng đổ Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6, // Bóng đổ iOS
  },
  largeOnlyIcon: {

    width: 60,
    height:60,
    paddingLeft:4,
    paddingRight:4,
    paddingTop:8,
    paddingBottom:8,
    borderRadius:50,
    backgroundColor:"#D2B48C",
    paddingVertical: 14,
    paddingHorizontal: 30,
    elevation: 50, // Bóng đổ Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 50, // Bóng đổ iOS
  },

});
