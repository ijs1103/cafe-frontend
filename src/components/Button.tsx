import styled from "styled-components";

const Button = styled.input<{disabled?: boolean}>`
    all: unset;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: ${props => props.disabled ? "#777" : props.theme.signUpBtn};
    color: ${props => props.disabled ?"#8c8c8c" : "white"};
    height: 50px;
    width: 100%;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
`;
export default Button;