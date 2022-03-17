import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
interface Isubtitle{
    title: string;
}
const Container = styled.div`
    width: 100%;
    height: 90px;
    background-color: #FFF;
`;
const Inner = styled.div`
    position: relative;
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
    color: #333333;
`;
const Title = styled.h2`
    font-size: 37px;
    font-weight: 700;
    position: absolute;
    bottom: 18px;
    left: 15px;
`;
const Map = styled.ul`
    display: flex;
    position: absolute;
    align-items: center;
    bottom: 18px;
    right: 15px;
`;
const SubTitle:React.FC<Isubtitle> = ({title}) => {
    return(
        <Container>
            <Inner>
                <Title>{title}</Title>
                <Map>
                    <li><FontAwesomeIcon icon={faHome} size="lg" /></li>
                    <li style={{"margin": "0 7px"}}><FontAwesomeIcon icon={faChevronRight} size="lg" /></li>
                    <li>{title}</li>
                </Map>
            </Inner>
        </Container>
    );
};
export default SubTitle;