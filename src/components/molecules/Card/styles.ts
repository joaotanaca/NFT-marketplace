import styled, { css } from "styled-components";

export const Container = styled.div`
    ${({ theme }) => css`
        background: ${theme.item};
        color: ${theme.text};
        .divider {
            width: 100%;
            height: 1px;
            left: 0;
            background: ${theme.white};
        }
    `}
`;
