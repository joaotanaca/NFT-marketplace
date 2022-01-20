import React, { useCallback, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import Icon from "./Icon";

export const Container = styled.div<{ background: string }>`
    width: 36px;
    height: 20px;
    background: ${({ background }) => background};
    .absolute {
        padding-left: 0.19rem;
        left: 0;
        &.active {
            left: calc(100% - 21px);
        }
    }
`;

const Toogle: React.FC<{
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    value: boolean;
}> = ({ onClick, value = false }) => {
    const theme = useTheme();

    const classname = useMemo(
        () =>
            value
                ? "absolute pr-0.5 active top-1/2 transform -translate-y-1/2 transition-all"
                : "absolute pr-0.5 top-1/2 transform -translate-y-1/2 transition-all",
        [value],
    );

    return (
        <Container
            onClick={onClick}
            className="rounded-full relative cursor-pointer transition-all"
            background={value ? theme.purple : theme.lightGray}
        >
            <div className={classname}>
                <Icon name="circle" size={16} color={theme.white} />
            </div>
        </Container>
    );
};

export default Toogle;
