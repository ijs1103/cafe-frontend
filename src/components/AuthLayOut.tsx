import styled from "styled-components";
import bg from "../assets/loginBg.jpeg";

const Container = styled.div`
position: relative;
`;
const BackGround = styled.div`
background-image: url(${bg});
background-size: cover;
width: 100%;
height: 100%;
position: absolute;
top:0;
left:0;
opacity: .7;
z-index: -1;
`;
const FormBody = styled.div`
max-width: 450px;
margin: 0 auto;
height: 100%;
padding: 90px 0 50px 0;
`;
const FormBox = styled.div`
background-color: black;
opacity: .9;
min-height: 560px;
border-radius: 10px;
padding: 60px 68px 40px;
`;
const H1 = styled.h1`
color: white;
font-size: 32px;
font-weight: 700;
`;
interface Iauthlayout{
        title: string,
        children: any
}
const AuthLayOut: React.FunctionComponent<Iauthlayout> = ({ title, children }) =>
        <Container>
                <BackGround>
                </BackGround>
                <FormBody>
                    <FormBox>
                            <H1>{title}</H1>
                            {children}
                    </FormBox>
                </FormBody>
        </Container>
;
export default AuthLayOut;
