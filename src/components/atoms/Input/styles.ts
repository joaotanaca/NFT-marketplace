import styled, { css } from "styled-components";

export const Container = styled.div`
    ${({ theme }) => css`
        padding: 14px 0;
        input {
            background: ${theme.input};
            color: ${theme.gray};
            &::-webkit-input-placeholder {
                color: ${theme.gray};
            }
            &:-moz-placeholder {
                color: ${theme.gray};
                opacity: 1;
            }
            &::-moz-placeholder {
                color: ${theme.gray};
                opacity: 1;
            }
            &:-ms-input-placeholder {
                color: ${theme.gray};
            }
            &::-ms-input-placeholder {
                color: ${theme.gray};
            }

            &::placeholder {
                color: ${theme.gray};
            }
        }
    `}
`;
