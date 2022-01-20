import styled from "styled-components";

export const Container = styled.nav.attrs({
    className: "stick w-full flex justify-between items-center px-8",
})`
    background-color: ${({ theme }) => theme.navbar};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
`;
