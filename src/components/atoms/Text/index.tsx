import React, { useMemo } from "react";
import { useTheme } from "styled-components";
import { Theme } from "styles/theme";
import { TextComponent } from "./styles";

const Text: React.FC<{
    color?: keyof Theme;
    className?: string;
    onClick?: (
        event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    ) => void;
}> = ({ children, color = "text", className = "", onClick }) => {
    const theme = useTheme();

    const colorSelected = useMemo(() => theme[color], [color, theme]);
    return (
        <TextComponent
            colorText={colorSelected}
            onClick={onClick}
            className={className}
        >
            {children}
        </TextComponent>
    );
};

export default Text;
