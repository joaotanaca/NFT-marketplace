import styled, { css } from "styled-components";

export const ButtonOrder = styled.button`
    ${({ theme }) => css`
        &.asc {
            background: ${theme.purple};
        }
        &.desc {
            background: ${theme.green};
        }
    `}
`;
