import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeKeys } from "styles/theme";

type ThemeContext = { theme: ThemeKeys; handleTheme: () => void };

const ThemeContext = createContext({
    theme: "light",
    handleTheme: () => {
        return;
    },
} as ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<ThemeKeys>("light");

    const handleTheme = () => {
        setTheme((prev) => {
            const attTheme = prev !== "dark" ? "dark" : "light";
            localStorage.setItem("theme", attTheme);

            return attTheme;
        });
    };

    useEffect(() => {
        const localstorageTheme = (localStorage.getItem("theme") ??
            "light") as ThemeKeys;
        setTheme(localstorageTheme);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, handleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
