import styled from "styled-components";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ModalBg = styled.div<{clicked: boolean}>`
  position: fixed;
  padding-top: -125px;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${props => props.clicked ? "block" : "none"};
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 100;
`;
export const Modal = styled.div`
      position: fixed;
      top: 50%;
      left: 50%;
      width: 400px;
      height: 400px;
      z-index: 100;
      transform: translate(-50%, -50%);
`;
export const ModalInner = styled.div`
  position: relative;
`;
const btnCloseStyle: React.CSSProperties = {
  position: "absolute",
  top: "-8%",
  right: "0",
  color: "white",
  cursor: "pointer"
};
interface Imodal {
  children: React.ReactNode,
  active: boolean,
  clickHandler: React.MouseEventHandler
}
const ModalComponents: React.FunctionComponent<Imodal> = ({ children, active, clickHandler}) => {
  if(!active) return null;
  return(
    <ModalBg onClick={clickHandler} clicked={active}>
      <Modal><ModalInner><FontAwesomeIcon onClick={clickHandler} style={btnCloseStyle} icon={faWindowClose} size="2x"/>{children}</ModalInner></Modal>
    </ModalBg>
  );
};
export default ModalComponents;
