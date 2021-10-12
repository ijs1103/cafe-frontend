import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLongArrowAltUp} from "@fortawesome/free-solid-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { darkTheme, lightTheme } from "../styles";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import { useReactiveVar } from "@apollo/client";

const ThemeTxt = styled.span`
    padding-left: 10px;
    font-size: 13px;
`;
const ThemeBtn = styled.div<{isDark: boolean}>`
    position: fixed;
    border-radius: 20px;
    right: 78px;
    bottom: 19px;
    width: 146px;
    height: 40px;
    z-index: 99;
    background-color: ${props => props.isDark ? "#4e4c4c" : "white"};
    color: ${props => props.theme.fontColor};
    box-shadow: ${props => !props.isDark && "1px 3px 2px 1px gray"};
    display: flex;
    align-items: center;
    padding-left: 10px;
    cursor: pointer;
    &:hover{
        color: ${props => props.isDark ? "#19CE60" : "#F4D621"};
        ${ThemeTxt}{
            color: ${props => props.isDark ? lightTheme.fontColor : darkTheme.fontColor};
        }
        background-color: ${props => props.isDark ? "white" : darkTheme.bgColor};
    }
`;
const TopBtn = styled.div<{isDark: boolean}>`
    position: fixed;
    padding-top: 3px;
    right: 28px;
    bottom: 19px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    text-align: center;
    z-index: 99;
    cursor: pointer;
    background-color: ${props => props.isDark ? "#4e4c4c" : "white"};
    color: ${props => props.theme.fontColor};
    &:hover{
        color: ${props => props.isDark ? "#19CE60" : "#F4D621"};
        background-color: ${props => props.isDark ? "white" : darkTheme.bgColor};
    }
    box-shadow: ${props => !props.isDark && "1px 3px 2px 1px gray"};
`;
const toTheTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};
const ThemeSet:React.FunctionComponent = () => {
    const darkMode = useReactiveVar(darkModeVar);
    return (
    <>
        <ThemeBtn isDark={darkMode} onClick={darkMode ? disableDarkMode : enableDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg"/>
            <ThemeTxt>{darkMode ? "라이트 모드로 보기" : "다크 모드로 보기"}</ThemeTxt>
        </ThemeBtn>
        <TopBtn isDark={darkMode} onClick={toTheTop}>
            <FontAwesomeIcon icon={faLongArrowAltUp} size="2x"/>
        </TopBtn>
    </>
)};
export default ThemeSet;