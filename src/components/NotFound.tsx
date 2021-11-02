import styled from "styled-components";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
`;
const Ntext = styled.h2`
    margin-top: 20px;
    font-size: 30px;
    color: wheat;
`;
const NotFound = () => (
    <Container>
        <FontAwesomeIcon color="wheat"icon={faExclamationTriangle} size="6x"/>
        <Ntext>결과가 없습니다.</Ntext>
    </Container>
);
export default NotFound;