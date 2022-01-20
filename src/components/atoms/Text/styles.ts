import styled from "styled-components";

export const TextComponent = styled.p<{ colorText: string }>`
    color: ${({ colorText }) => colorText};
`;
