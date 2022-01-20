import React, { HTMLAttributes } from "react";
import { Container } from "./styles";

type TProps = HTMLAttributes<HTMLInputElement> & { icon?: JSX.Element };

const Input: React.FC<TProps> = ({ className = "", icon, ...props }) => {
    return (
        <Container className="relative">
            {icon && <div className="absolute left-4 top-1/2 transform -translate-y-1/2">{icon}</div>}
            <input
                className={
                    icon
                        ? `rounded-xl text-xs py-1.5 pl-10 pr-1.5 outline-none ${className}`
                        : `rounded-xl text-xs py-1.5 px-1.5 pr-1.5 outline-none ${className}`
                }
                {...props}
            />
        </Container>
    );
};

export default Input;
