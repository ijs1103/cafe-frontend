import styled from "styled-components";

const SFormError = styled.div`
    color: red;
    font-size: 14px;
    padding: 6px 3px;
    position: absolute;
    bottom: -50%;
`;
interface IinputError{
    message: string | undefined
}
const InputError: React.FunctionComponent<IinputError> = ({message}) => 
message === "" || !message ? null : <SFormError>{message}</SFormError>;

export default InputError;