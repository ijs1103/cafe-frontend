import styled from "styled-components";

const Container = styled.div`
    background-color: ${props => props.theme.footerBg};
    color: ${props => props.theme.fontColor};
    width: 100%;
`;
const Table = styled.div`
    display: flex;
    width: 1100px;
    margin: 0 auto;
    padding: 25px 0 30px 0;
`;
const Tul = styled.ul`
    width: 220px;
    font-size: 12px;
`;
const Tli = styled.li`
    padding: 3px 0;
    &:nth-child(1){
        padding: 10px 0;
    }
`;
const H2 = styled.span`
    font-size: 15px;
    color: ${props => props.theme.h2Color};
`;
const CopyRight = styled.div`
    padding: 20px 0;
    background-color: ${props => props.theme.copyBg};
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const Copy = styled.div`
    display: flex;
    width: 1000px;
    margin: 0 auto;
`;
const Cli = styled.a`
    border-right: 0.7px solid ${props => props.theme.fontColor};
    padding: 0 10px;
`;
const Buttons = styled.div`
    width: 400px;
    padding: 20px 0;
    margin: 0 auto;
`;
const Button = styled.span`
    border: ${props => props.theme.fontColor} solid 2px;
    padding: 3px 15px;
    font-size: 14px;
    margin-left: 10px;
    border-radius: 5px;
`;
const Bu = styled.ul`
    width: 700px;
    padding: 12px 0;
    margin: 0 auto;
    display: flex;
`;
const Bli = styled.li`
    color: gray;
    margin-left: 10px;
`;
const Reserved = styled.span`
    width: 100%;
    margin-left: 43%;
    color: darkgray;
`;
const Footer = () => {
    return(<Container>
    <>
        <Table>
            <Tul>
                <Tli><H2>COMPANY</H2></Tli>
                <Tli>한눈에 보기</Tli>
                <Tli>스타벅스 사명</Tli>
                <Tli>국내 뉴스룸</Tli>
                <Tli>세계의 스타벅스</Tli>
                <Tli>글로벌 뉴스룸</Tli>
            </Tul>
            <Tul>
                <Tli><H2>CORPORATE SALES</H2></Tli>
                <Tli>단체 및 기업 구매 안내</Tli>
            </Tul>
            <Tul>
                <Tli><H2>PARTNERSHIP</H2></Tli>
                <Tli>신규 입점 제의</Tli>
                <Tli>협력 고객사 등록신청</Tli>
            </Tul>
            <Tul>
                <Tli><H2>ONLINE COMMUNITY</H2></Tli>
                <Tli>페이스북</Tli>
                <Tli>트위터</Tli>
                <Tli>유튜브</Tli>
                <Tli>인스타그램</Tli>
            </Tul>
            <Tul>
                <Tli><H2>RECRUIT</H2></Tli>
                <Tli>채용 소개</Tli>
                <Tli>채용 지원하기</Tli>
            </Tul>
        </Table>
    </>
    <CopyRight>
        <Copy>
            <Cli>개인정보처리방침</Cli>
            <Cli>영상정보처리기기 운영관리 방침</Cli>
            <Cli>홈페이지 이용약관</Cli>
            <Cli>위치정보 이용약관</Cli>
            <Cli>스타벅스 카드 이용약관</Cli>
            <Cli>비회원 이용약관</Cli>
            <Cli>My DT Pass 서비스 이용약관</Cli>
            <a href="#none" style={{"paddingLeft": "10px"}}>윤리경영 핫라인</a>
        </Copy>
        <Buttons>
            <Button>찾아오시는 길</Button>
            <Button>신규입점제의</Button>
            <Button>사이트 맵</Button>
        </Buttons>
        <>
            <Bu>
                <Bli>사업자등록번호 : 123-45-67899</Bli>
                <Bli>(주)벅스스타 커피 코리아 대표이사 : 이순신</Bli>
                <Bli>TEL : 1234-5678</Bli>
                <Bli>개인정보 책임자 : 홍길동</Bli>
            </Bu>
            <Reserved>ⓒ 2021 BucksStar. All Rights Reserved.</Reserved>
        </>
    </CopyRight>
</Container>);
};
export default Footer;