const light = {
    purple: "#6110C9",
    green: "#0F7D48",
    red: "#FF6969",
    white: "#FFFFFF",
    gray: "#828282",
    primaryItems: "#F3F3F3",
    lightText: "#333333",
    text: "#0000",
    backgroundModal: "#DBF0EF",
    background: "#FCFCFC",
};

const dark = {
    purple: "#6110C9",
    green: "#0F7D48",
    red: "#FF6969",
    white: "#FFFFFF",
    gray: "#828282",
    primaryItems: "#242424",
    lightText: "#FFF",
    text: "#FFF",
    backgroundModal: "#272727",
    background: "#000000",
};

const theme = {
    dark,
    light,
};

export type Theme = typeof dark;

export default theme;
