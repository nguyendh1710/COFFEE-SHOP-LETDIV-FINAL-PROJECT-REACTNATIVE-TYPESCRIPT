import { StyleSheet } from 'react-native';
import { TypeOfTheme } from './../../theme/themeTypes';

export const customStyles = (theme:TypeOfTheme) => StyleSheet.create({
 dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    maxHeight: 300,
    paddingVertical: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemIcon: {
    marginRight: 10,
  },
  itemIconImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: "contain",
  },
  itemText: {
    fontSize: 16,
  },

});
