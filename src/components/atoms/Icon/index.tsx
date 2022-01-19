import React, { useMemo } from "react";
import { IconsName } from "./source";
import source from "./source";
import { useTheme } from "styled-components";
import { Theme } from "styles/theme";

type IconPropsT = { size?: number; color?: string; name: IconsName };

const Icon: React.FC<IconPropsT> = ({ name, size = 24, color }) => {
    const IconComponent = useMemo(() => source[name], [name]);
    const theme = useTheme() as Theme;

    return <IconComponent size={size} color={color || theme.text} />;
};

export default Icon;
