import "styled-components";

declare module 'styled-components'{
    // DefaultTheme는 키워드다 
    export interface DefaultTheme{
        bgColor: string;
        fontColor: string;
        li: string;
        liSelect: string;
        footerBg: string;
        copyBg: string;
        btHover: string;
        promo: string;
        reward: string;
        signUpBtn: string;
        h2Color: string;
    }
}
