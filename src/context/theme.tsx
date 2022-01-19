import React, { createContext, useContext } from "react";
import theme from "styles/theme";

type ThemeContext = { theme: keyof typeof theme };

const ThemeContext = createContext({} as ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
    return (
        <ThemeContext.Provider value={{ theme: "light" }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
