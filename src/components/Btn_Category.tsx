import styled from "styled-components";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Li = styled.li`
    display: flex;
    padding: 5px;
`;
const Btn = styled.span`
    background-color: ${props => props.theme.reward};
    color: white;
    font-size: 20px;
    padding: 10px;
    border-radius: 15px;
`;
const btnCloseStyle: React.CSSProperties = {
    color: "wheat",
    cursor: "pointer"
};
interface Ibtn {
    text: string,
    close?: () => void;
}
const BtnCategory: React.FunctionComponent<Ibtn> = ({text, close}) => {
    if(text==="") return null;
    return (<Li><Btn>#{text}</Btn>{close && <FontAwesomeIcon onClick={close} style={btnCloseStyle} icon={faWindowClose} />}</Li>);
}
export default BtnCategory;