import React, { HTMLAttributes, useMemo } from "react";
import { Theme } from "styles/theme";
import { ButtonComponent } from "./styles";

const buttonTypes = {
    outline: "border px-3 py-1 rounded-full",
    solid: "rounded-lg px-6 py-1 mt-8",
};

type PropsT = HTMLAttributes<HTMLButtonElement> & {
    buttonType?: keyof typeof buttonTypes;
    background?: keyof Theme;
};

const Button: React.FC<PropsT> = ({
    children,
    buttonType = "solid",
    background = "transparent",
    className,
    ...props
}) => {
    const type = useMemo(() => buttonTypes[buttonType], [buttonType]);
    return (
        <ButtonComponent
            background={background}
            className={`${className} ${type}`}
            {...props}
        >
            {children}
        </ButtonComponent>
    );
};

export default Button;
