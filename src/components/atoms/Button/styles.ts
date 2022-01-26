import styled, { css } from "styled-components";
import { Theme } from "styles/theme";

export const ButtonComponent = styled.button<{
    background: keyof Theme | string;
}>`
    ${({ theme, background }) => css`
        background: ${background !== "transparent"
            ? theme[background as keyof Theme]
            : "transparent"};
        color: ${background !== "transparent" ? theme.white : theme.text};
        &.border {
            border: 1px solid ${theme.text};
        }
    `}
`;
