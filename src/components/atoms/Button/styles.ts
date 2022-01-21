import styled, { css } from "styled-components";

export const ButtonComponent = styled.button`
    ${({ theme }) => css`
        &.border {
            border: 1px solid ${theme.text};
        }
    `}
`;
