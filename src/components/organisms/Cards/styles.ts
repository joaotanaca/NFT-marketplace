import styled from "styled-components";

export const Container = styled.div.attrs({
    className: "px-5 py-7 mb-7 grid grid-cols-12 xl:grid-cols-10 gap-8",
})`
    background: ${({ theme }) => theme.primaryItems};
    border-radius: 10px;
    .default-message {
        color: ${({ theme }) => theme.text};
    }
`;
