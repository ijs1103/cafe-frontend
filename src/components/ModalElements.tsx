import styled from "styled-components";

export const ModalBg = styled.div<{active: boolean}>`
  position: fixed;
  padding-top: -125px;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${props => props.active ? "block" : "none"};
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
