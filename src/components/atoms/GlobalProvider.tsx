import { useTheme } from "context/theme";
import React, { useMemo } from "react";
import { ThemeProvider as ThemeProviderStyled } from "styled-components";
import theme from "styles/theme";
import Global from "styles/global";
import { AssetsProvider } from "context/assets";

const GlobalProvider: React.FC = ({ children }) => {
    const { theme: themeContext } = useTheme();
    const selectedTheme = useMemo(() => theme[themeContext], [themeContext]);
    return (
        <ThemeProviderStyled theme={selectedTheme}>
            <AssetsProvider>
                <Global />
                {children}
            </AssetsProvider>
        </ThemeProviderStyled>
    );
};

export default GlobalProvider;
