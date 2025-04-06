import React, { createContext, useState, useContext, ReactNode } from "react";
import { lightTheme, darkTheme } from "./../theme/Theme";
import { TypeOfTheme } from "../theme/themeTypes";


// Định nghĩa kiểu dữ liệu cho context
type ThemeContextType = {
  theme: TypeOfTheme;
  toggleTheme: () => void;
}

// Giá trị mặc định cho context
const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
});

// Định nghĩa kiểu dữ liệu cho `ThemeProvider` (children là ReactNode)
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<TypeOfTheme>(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook để sử dụng theme
export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
