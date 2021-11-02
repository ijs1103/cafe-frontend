import styled, {keyframes} from "styled-components";
const spinner = keyframes`
    from {transform: rotate(0deg); }
    to {transform: rotate(360deg);}
`;
const Loading = styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    z-index: 500;
`;
const Spinner = styled.div`
    width: 128px;
    height: 128px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 10px solid transparent;
    border-top-color: ${props => props.theme.signUpBtn};
    border-bottom-color: ${props => props.theme.signUpBtn};
    animation: ${spinner} .8s ease infinite;
`;
const Loader:React.FC = () => {
    return (
        <Loading>
            <Spinner></Spinner>
        </Loading>
    );
};
export default Loader;