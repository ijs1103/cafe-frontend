import { DefaultTheme, createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
    bgColor: "#F6F5EF",
    fontColor: "#333333",
    li: "#2c2a29",
    liSelect: "#669900",
    footerBg: "#FAFBFC",
    copyBg: "#F7F9FA",
    btHover: "#d5bea6",
    promo: "white",
    reward: "#1e3932",
    signUpBtn: "#00704a",
    h2Color: "#202020",
};

export const darkTheme: DefaultTheme = {
    bgColor: "rgb(22,22,22)",
    fontColor: "lightgray",
    li: "#2c2a29",
    liSelect: "#669900",
    footerBg: "#2C2A2A",
    copyBg: "#282828",
    btHover: "#d5bea6",
    promo: "gray",
    reward: "#1e3932",
    signUpBtn: "#00704a",
    h2Color: "#FFF",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    button{
        all: unset;
    }
    body{
        height: 100vh;
        font-family: 'nbg', '맑은 고딕', HelveticaNeue, DroidSans, Sans-serif, Helvetica;
        font-size:16px;
        min-width: 600px;
        padding-top:125px;
        overflow-x: hidden;
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.fontColor};
    }
`;