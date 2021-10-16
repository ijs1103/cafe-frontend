import styled from "styled-components";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Li = styled.li`
    //padding: 5px 0;
    display: flex;
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
    close: () => void;
}
const Btn_Category: React.FunctionComponent<Ibtn> = ({text, close}) => {
    if(text==="") return null;
    return (<Li><Btn>#{text}</Btn><FontAwesomeIcon onClick={close} style={btnCloseStyle} icon={faWindowClose} /></Li>);
}
export default Btn_Category;