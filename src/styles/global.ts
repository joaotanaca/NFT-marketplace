import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme";

export default createGlobalStyle`
    html{
        scroll-behavior: smooth;
        font-weight: 400;
    }
    body{
        background: ${({ theme }) => (theme as Theme).background};
        font-family: 'Oswald', sans-serif;
    }
`;
