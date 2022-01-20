import styled from "styled-components";

export const Container = styled.nav.attrs({
    className: "stick w-full flex justify-between items-center px-8",
})`
    background-color: ${({ theme }) => theme.navbar};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
    .menu-item {
        &.active {
            &:after {
                content: "";
                position: absolute;
                width: 83%;
                height: 3px;
                background-color: ${({ theme }) => theme.purple};
                bottom: -70%;
                left: 0;
            }
        }
    }
`;
