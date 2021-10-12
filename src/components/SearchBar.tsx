import styled from "styled-components";
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
    padding: ${props =>  props.isClicked ? "5px" : "0px" };
`;
const Form = styled.form``;

const SearchBar = () => {
    const [clicked, setClicked] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(clicked && searchWord===""){
            alert("검색어를 입력해주세요.");
        }
        console.log("검색클릭");
    };
    const handleChange = (event: any) => {
        const {
            target: { value }
          } = event;
        setSearchWord(value);
    }
    console.log(searchWord); 
    return <Container onClick={() => setClicked(true)}>
        <Form onSubmit={handleSubmit}><Input value={searchWord} onChange={handleChange} placeholder="통합검색" isClicked={clicked}/></Form>
        <Logo onClick={handleSubmit}isClicked={clicked}>
            <FontAwesomeIcon icon={faSearch} size="lg"/>
        </Logo>
    </Container>
}
export default SearchBar;
