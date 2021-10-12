import styled from "styled-components";

export const InputDiv = styled.div`
    position: relative;
    margin-top: 30px;
`;
export const ClearIcon = styled.span<{active: boolean}>`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.signUpBtn};
    display: ${props => props.active ? "block" : "none"};
    cursor: pointer;
`;
export const Input = styled.input<{focused?: boolean, disabled?: boolean}>`
    all: unset;
    box-sizing: border-box;
    background-color: ${props => props.focused ? "#444" : !props.disabled ? "#333" : "#777"};
    width: 100%;
    height: 50px;
    border-radius: 5px;
    padding: 16px 40px 0 20px;
    color: white;
    font-size: 22px;
    border: none;
    border-bottom: ${props => props.focused && `4px ${props.theme.signUpBtn} solid`};
`;
export const Label = styled.label<{focused?: boolean}>`
    font-size: ${props => props.focused ? "13px" : "18px"};
    position: absolute;
    font-weight: ${props => props.focused ? "800" : "500"};
    left: 20px;
    top: ${props => props.focused ? "20%" : "50%"};
    color:${props => props.focused ? props.theme.signUpBtn : "#8c8c8c"};
    transform: translateY(-50%);
    transition: all .1s ease;
`;