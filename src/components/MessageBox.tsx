import styled, { keyframes, css } from "styled-components";
import { useState } from "react";
import logo from "../assets/logo.png";
const In = keyframes`
    0% {
        top: -30px;
        opacity: 0;
    }
    50% {
        top: 19px;
        opacity: 1;
    }
    95% {
        top: 19px;
        opacity: 1;
    }
    100% {
        top: 0px;
        opacity: 0;
    }
`;

const Message = styled.div<{isClicked: boolean}>`
    z-index: 200;
    position: fixed;
    background-color: #E1DCD9;
    border-radius: 10px;
    left: 50%;
    top: 19px;
    transform: translate(-50%);
    width: 300px;
    opacity: 0.95;
    padding: 5px 10px;
    animation: ${In} 3s ease-in-out;
    opacity: 0;
`;
const Top = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #9e5d34;
`;

const Logo = styled.div`
    background-image: url(${logo});
    background-size: cover;
    width: 25px;
    height: 25px;
`;
const Text = styled.span`
    position: absolute;
    left: 13%;
`;
const MessageText = styled.div`
    color: black;
    padding: 15px 0;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    //margin-right: 100px;
`;
interface Imessage{
    message: string | undefined
}
const MessageBox: React.FunctionComponent<Imessage> = ({message}) => {
    const [clicked, setClicked] = useState(false);
    return (
        message === "" || !message ? null :
        <Message isClicked={clicked} onClick={()=>setClicked(!clicked)}>
            <Top>
                <Logo />
                <Text>스타벅스</Text>
                <span>방금</span>
            </Top>
            <MessageText>{message}</MessageText>
        </Message>
    );
};
    ;

export default MessageBox;