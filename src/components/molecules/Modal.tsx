import { Button } from "components/atoms";
import React from "react";
import styled from "styled-components";
import { Theme } from "styles/theme";
type ButtonsT = { click?: () => void; color?: keyof Theme };
type PropsT = {
    primaryButton?: ButtonsT;
    secondButton?: ButtonsT;
};

const ModalCard = styled.div`
    background: rgba(0, 0, 0, 0.5);
    .absolute {
        border: 5px solid #ffffff;
        background: ${({ theme }) => theme.backgroundModal};
        color: ${({ theme }) => theme.text};
        box-shadow: 2px 4px 38px -6px rgba(0, 0, 0, 0.25);
        padding: 50px 92px;
        border-radius: 10px;
    }
`;

const Modal: React.FC<PropsT> = ({ children, primaryButton, secondButton }) => {
    return (
        <ModalCard className="fixed top-0 left-0 w-full h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {children}
                <div className="flex gap-5">
                    <Button
                        onClick={secondButton?.click}
                        background={secondButton?.color || "red"}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={primaryButton?.click}
                        background={primaryButton?.color || "green"}
                    >
                        Buy
                    </Button>
                </div>
            </div>
        </ModalCard>
    );
};

export default Modal;
