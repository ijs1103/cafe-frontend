import {useState} from "react";
import { Link } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import SearchBar from "./SearchBar";
import styled, { keyframes, css } from "styled-components";
import { isLoggedInVar } from "../apollo";
import logo from "../assets/logo.png";
import subLogo from "../assets/subLogo.jpeg";
import { logUserOut } from "../apollo";

const Container = styled.header`
    text-align: center;
    height: 125px;
    font-weight: 400;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${props => props.theme.bgColor};
    z-index: 2;
`;
const Wrapper = styled.div`
    height: 100%;
    width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const Logo = styled.h1`
    position: absolute;
    top: 22px;
    z-index: 10;
`;
const H2 = styled.p`

`;
const H3 = styled.p`
    color: white;
    padding-bottom: 12px;
`;
const H4 = styled.p`
    color: wheat;
    font-size: 0.6rem;
`;
const TopMenu = styled.div`
    display: flex;
    padding: 15px 50px 15px 0;
    font-size: 0.8rem;
    justify-content: flex-end;
`;
const Ul = styled.ul`
    display: flex;
`;
const Sul = styled.ul`
    padding-top: 3px;
    width: 220px;
`;
const TopLi = styled.li`
    padding: 0.5rem;
    border-right: solid gray 1px;
`;
const TLi = styled.li`padding: 0.5rem;`;
const Li = styled.li`
    padding: 5px 0;
    display: flex;
    justify-content: flex-start;
`;
const BottomMenu = styled.div`
    display: flex;
    justify-content: flex-end;
    height: 66px;
`;
const SubWrapper = styled.div`
    background-color: ${props => props.theme.li};
    display: none;
    position: absolute;
    width: 100%;
    left: 0;
    top: 125px;
    z-index: 11;
`;
const SubMenu = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0;
    width: 1100px;
    margin: 0 auto;
`;
const SubBottomWrapper = styled.div`
    background: url(${subLogo});
    position: absolute;
    width: 100%;
    left: 0;
`;
const SubBottom = styled.div`
    width: 1100px;
    margin: 0 auto;
    padding: 15px 0;
`;
const DropDown = keyframes`
        0% {
            transform: scaleY(0)
        }
        100% {
            transform: scaleY(1)
        }
`;
const DropUp = keyframes`
        0% {
            transform: scaleY(1)
        }
        100% {
            transform: scaleY(0)
        }
`;
const BotLi = styled.li<{isHover: boolean, current: boolean}>`
    padding: 12px;
    ${SubWrapper}{
        display: ${props => props.current && !props.isHover && "block"};
        animation: ${props => props.current && !props.isHover && css`${DropUp} 0.5s ease-in-out forwards`};
        transform-origin: ${props => props.current && !props.isHover && "top center"};
    }
    &:hover{
        background-color: ${props => props.theme.li};
        ${SubWrapper}{
            display: block;
            animation: ${DropDown} 0.5s ease-in-out forwards;
            transform-origin: top center;
        }
        ${H2}{
            color: ${props => props.theme.liSelect};
        }
    } 
`;
const Header = () => {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const [mouseOn, setMouseOn] = useState(false);
    const [index, setIndex] = useState(0);
    return(
        <Container>
            <Wrapper>
                <Logo><a href="/"><img src={logo} alt="logo"/></a></Logo>   
                <TopMenu>
                    <Ul>
                    <Link to={isLoggedIn ? "/" : "/login"}>{isLoggedIn ? <TopLi onClick={()=>logUserOut()}>로그아웃</TopLi> : <TopLi>로그인</TopLi>}</Link>
                        <TopLi>마이페이지</TopLi>
                        <TopLi>고객센터</TopLi>
                        <TLi>매장찾기</TLi>
                    </Ul>
                    <SearchBar />
                </TopMenu>
                <BottomMenu>
                    <Ul>
                        <BotLi current={1===index} isHover={mouseOn}><H2>STORE</H2></BotLi>
                        <BotLi current={2===index} isHover={mouseOn} onMouseOver={()=>{setMouseOn(!mouseOn);setIndex(2);}} onMouseOut={()=>setMouseOn(!mouseOn)}><H2>COFFEE</H2>
                            <SubWrapper>
                                <SubMenu>
                                    <Sul>
                                        <Li><H3>커피</H3></Li>
                                        <Li><H4>스타벅스 원두</H4></Li>
                                        <Li><H4>스타벅스앳홈 by 캡슐</H4></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>나와 어울리는 커피</H3></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>스타벅스 리저브</H3></Li>
                                        <Li><H4>RESERVE MAGAZINE</H4></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>에스프레소 음료</H3></Li>
                                        <Li><H4>토피오</H4></Li>
                                        <Li><H4>아메리카노</H4></Li>
                                        <Li><H4>마키아또</H4></Li>
                                        <Li><H4>카푸치노</H4></Li>
                                        <Li><H4>라떼</H4></Li>
                                        <Li><H4>모카</H4></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>최상의 커피를 즐기는 법</H3></Li>
                                        <Li><H4>커피 프레스</H4></Li>
                                        <Li><H4>푸어 오버</H4></Li>
                                        <Li><H4>아이스 푸어 오버</H4></Li>
                                        <Li><H4>커피 메이커</H4></Li>
                                        <Li><H4>리저브를 매장에서 다양하게 즐기는 법</H4></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>커피 이야기</H3></Li>
                                        <Li><H4>농장에서 우리의 손으로</H4></Li>
                                        <Li><H4>최상의 아라비카 원두</H4></Li>
                                        <Li><H4>스타벅스 로스트 스펙트럼</H4></Li>
                                        <Li><H4>스타벅스 디카페인</H4></Li>
                                        <Li><H4>클로버 커피 추출 시스템</H4></Li>
                                    </Sul>
                                </SubMenu><SubBottomWrapper><SubBottom>
                                    <Sul style={{"width": "70%"}}>
                                        <Li><H4 style={{"fontSize": "14px"}}>나와 어울리는 커피 찾기</H4></Li>
                                        <Li><H4 style={{"color": "#19b3b1", "paddingBottom": "10px"}}>스타벅스가 여러분에게 어울리는 커피를 찾아드립니다</H4></Li>
                                        <Li><H4 style={{"fontSize": "14px"}}>최상의 커피를 즐기는 법</H4></Li>
                                        <Li><H4 style={{"color": "#19b3b1"}}>여러기자 방법을 통해 다양한 흥미의 커피를 즐겨보세요</H4></Li>
                                    </Sul>
                                    </SubBottom></SubBottomWrapper></SubWrapper></BotLi>
                        <BotLi current={3===index} isHover={mouseOn} onMouseOver={()=>{setMouseOn(!mouseOn);setIndex(3)}} onMouseOut={()=>setMouseOn(!mouseOn)}><H2>MENU</H2>
                            <SubWrapper>
                                <SubMenu><Sul>
                                        <Li><H3>커피</H3></Li>
                                        <Li><H4>스타벅스 원두</H4></Li>
                                        <Li><H4>스타벅스앳홈 by 캡슐</H4></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>나와 어울리는 커피</H3></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>스타벅스 리저브</H3></Li>
                                        <Li><H4>RESERVE MAGAZINE</H4></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>에스프레소 음료</H3></Li>
                                        <Li><H4>토피오</H4></Li>
                                        <Li><H4>아메리카노</H4></Li>
                                        <Li><H4>마키아또</H4></Li>
                                        <Li><H4>카푸치노</H4></Li>
                                        <Li><H4>라떼</H4></Li>
                                        <Li><H4>모카</H4></Li>
                                    </Sul></SubMenu><SubBottomWrapper><SubBottom>
                                    <Sul style={{"width": "70%"}}>
                                        <Li><H4 style={{"fontSize": "14px"}}>나와 어울리는 커피 찾기</H4></Li>
                                        <Li><H4 style={{"color": "#19b3b1", "paddingBottom": "10px"}}>스타벅스가 여러분에게 어울리는 커피를 찾아드립니다</H4></Li>
                                        <Li><H4 style={{"fontSize": "14px"}}>최상의 커피를 즐기는 법</H4></Li>
                                        <Li><H4 style={{"color": "#19b3b1"}}>여러기자 방법을 통해 다양한 흥미의 커피를 즐겨보세요</H4></Li>
                                    </Sul>
                                    </SubBottom></SubBottomWrapper></SubWrapper></BotLi>
                        <BotLi current={4===index} isHover={mouseOn} onMouseOver={()=>{setMouseOn(!mouseOn);setIndex(4);}} onMouseOut={()=>setMouseOn(!mouseOn)}><H2>RESPONSIBILITY</H2>
                            <SubWrapper>
                                <SubMenu>
                                    <Sul>
                                        <Li><H3>최상의 커피를 즐기는 법</H3></Li>
                                        <Li><H4>커피 프레스</H4></Li>
                                        <Li><H4>푸어 오버</H4></Li>
                                        <Li><H4>아이스 푸어 오버</H4></Li>
                                        <Li><H4>커피 메이커</H4></Li>
                                        <Li><H4>리저브를 매장에서 다양하게 즐기는 법</H4></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>커피 이야기</H3></Li>
                                        <Li><H4>농장에서 우리의 손으로</H4></Li>
                                        <Li><H4>최상의 아라비카 원두</H4></Li>
                                        <Li><H4>스타벅스 로스트 스펙트럼</H4></Li>
                                        <Li><H4>스타벅스 디카페인</H4></Li>
                                        <Li><H4>클로버 커피 추출 시스템</H4></Li>
                                    </Sul>    
                                </SubMenu><SubBottomWrapper><SubBottom>
                                    <Sul style={{"width": "70%"}}>
                                        <Li><H4 style={{"fontSize": "14px"}}>나와 어울리는 커피 찾기</H4></Li>
                                        <Li><H4 style={{"color": "#19b3b1", "paddingBottom": "10px"}}>스타벅스가 여러분에게 어울리는 커피를 찾아드립니다</H4></Li>
                                        <Li><H4 style={{"fontSize": "14px"}}>최상의 커피를 즐기는 법</H4></Li>
                                        <Li><H4 style={{"color": "#19b3b1"}}>여러기자 방법을 통해 다양한 흥미의 커피를 즐겨보세요</H4></Li>
                                    </Sul>    
                                </SubBottom></SubBottomWrapper></SubWrapper></BotLi>
                        <BotLi current={5===index} isHover={mouseOn} onMouseOver={()=>{setMouseOn(!mouseOn);setIndex(5);}} onMouseOut={()=>setMouseOn(!mouseOn)}><H2>BUCKSSTAR REWARDS</H2>
                            <SubWrapper>
                                <SubMenu>
                                    <Sul>
                                        <Li><H3>스타벅스 리저브</H3></Li>
                                        <Li><H4>RESERVE MAGAZINE</H4></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>에스프레소 음료</H3></Li>
                                        <Li><H4>토피오</H4></Li>
                                        <Li><H4>아메리카노</H4></Li>
                                        <Li><H4>마키아또</H4></Li>
                                        <Li><H4>카푸치노</H4></Li>
                                        <Li><H4>라떼</H4></Li>
                                        <Li><H4>모카</H4></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>최상의 커피를 즐기는 법</H3></Li>
                                        <Li><H4>커피 프레스</H4></Li>
                                        <Li><H4>푸어 오버</H4></Li>
                                        <Li><H4>아이스 푸어 오버</H4></Li>
                                        <Li><H4>커피 메이커</H4></Li>
                                        <Li><H4>리저브를 매장에서 다양하게 즐기는 법</H4></Li>
                                    </Sul>    
                                </SubMenu><SubBottomWrapper><SubBottom>
                                    <Sul style={{"width": "70%"}}>
                                        <Li><H4 style={{"fontSize": "14px"}}>나와 어울리는 커피 찾기</H4></Li>
                                        <Li><H4 style={{"color": "#19b3b1", "paddingBottom": "10px"}}>스타벅스가 여러분에게 어울리는 커피를 찾아드립니다</H4></Li>
                                        <Li><H4 style={{"fontSize": "14px"}}>최상의 커피를 즐기는 법</H4></Li>
                                        <Li><H4 style={{"color": "#19b3b1"}}>여러기자 방법을 통해 다양한 흥미의 커피를 즐겨보세요</H4></Li>
                                    </Sul>  
                                    </SubBottom></SubBottomWrapper></SubWrapper></BotLi>
                        <BotLi current={6===index} isHover={mouseOn} onMouseOver={()=>{setMouseOn(!mouseOn);setIndex(6);}} onMouseOut={()=>setMouseOn(!mouseOn)}><H2>WHAT'S NEW</H2>
                            <SubWrapper>
                                <SubMenu>
                                    <Sul>
                                        <Li><H3>에스프레소 음료</H3></Li>
                                        <Li><H4>토피오</H4></Li>
                                        <Li><H4>아메리카노</H4></Li>
                                        <Li><H4>마키아또</H4></Li>
                                        <Li><H4>카푸치노</H4></Li>
                                        <Li><H4>라떼</H4></Li>
                                        <Li><H4>모카</H4></Li>
                                    </Sul>
                                    <Sul>
                                        <Li><H3>최상의 커피를 즐기는 법</H3></Li>
                                        <Li><H4>커피 프레스</H4></Li>
                                        <Li><H4>푸어 오버</H4></Li>
                                        <Li><H4>아이스 푸어 오버</H4></Li>
                                        <Li><H4>커피 메이커</H4></Li>
                                        <Li><H4>리저브를 매장에서 다양하게 즐기는 법</H4></Li>
                                    </Sul>
                                </SubMenu><SubBottomWrapper><SubBottom>
                                    <Sul style={{"width": "70%"}}>
                                        <Li><H4 style={{"fontSize": "14px"}}>나와 어울리는 커피 찾기</H4></Li>
                                        <Li><H4 style={{"color": "#19b3b1", "paddingBottom": "10px"}}>스타벅스가 여러분에게 어울리는 커피를 찾아드립니다</H4></Li>
                                        <Li><H4 style={{"fontSize": "14px"}}>최상의 커피를 즐기는 법</H4></Li>
                                        <Li><H4 style={{"color": "#19b3b1"}}>여러기자 방법을 통해 다양한 흥미의 커피를 즐겨보세요</H4></Li>
                                    </Sul>  
                                    </SubBottom></SubBottomWrapper></SubWrapper></BotLi>
                    </Ul>
                </BottomMenu>
            </Wrapper>
        </Container>
    );
};
export default Header;