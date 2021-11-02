import styled from "styled-components";
import {useHistory} from "react-router-dom";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = styled.input<{ isClicked: boolean}>`
    width: ${props =>  props.isClicked ? "150px" : "0px" };
    transition: width 0.5s ease-in-out, padding 0.5s ease-in-out;
    border: none;
    padding: ${props =>  props.isClicked ? "5px" : "0px" };
`;
const Container = styled.div`
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    padding: 0 5px;
    border: solid gray 1px;
`;
const Logo = styled.div<{ isClicked: boolean}>`
    padding: ${props =>  props.isClicked ? "5px" : "5px" };
`;

const SearchBar = () => {
    const [clicked, setClicked] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const history = useHistory();
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(!clicked) return;
        // 빈칸을 입력하고 검색하면 캔슬
        if(clicked && searchWord===""){
            return;
        }
        history.push(`/search/${searchWord}`);
    };
    const handleChange = (event: any) => {
        const {
            target: { value }
          } = event;
        setSearchWord(value);
    }
    return (
    <>
        <Container onClick={() => setClicked(true)}>
            <form onSubmit={handleSubmit}><Input value={searchWord} onChange={handleChange} placeholder="매장 이름으로 찾기" isClicked={clicked}/></form>
            <Logo onClick={handleSubmit} isClicked={clicked}>
                <FontAwesomeIcon icon={faSearch} size="2x"/>
            </Logo>
        </Container>
    </>);
}
export default SearchBar;
