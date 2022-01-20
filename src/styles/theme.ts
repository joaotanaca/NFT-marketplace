const light = {
    purple: "#6110C9",
    green: "#0F7D48",
    red: "#FF6969",
    white: "#FFFFFF",
    gray: "#828282",
    lightGray: "#CBD5E0",
    primaryItems: "#F3F3F3",
    lightText: "#333333",
    text: "#0000",
    backgroundModal: "#DBF0EF",
    background: "#FCFCFC",
    navbar: "#FFFFFF",
    input: "#F2F2F2",
};

const dark = {
    purple: "#6110C9",
    green: "#0F7D48",
    red: "#FF6969",
    white: "#FFFFFF",
    gray: "#828282",
    lightGray: "#CBD5E0",
    primaryItems: "#242424",
    lightText: "#FFF",
    text: "#FFF",
    backgroundModal: "#272727",
    background: "#000000",
    navbar: "#212121",
    input: "#3D3D3D",
};

const theme = {
    dark,
    light,
};

export type Theme = typeof dark;
export type ThemeKeys = keyof typeof theme;

export default theme;
