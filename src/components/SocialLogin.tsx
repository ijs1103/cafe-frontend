import styled from "styled-components";
import logo from "../assets/kakao.png";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import KaKaoLogin from 'react-kakao-login';
import { logUserIn } from "../apollo";

const Container = styled.div`
    display: flex;
    align-items: center;
`;
const Logo = styled.div`
    background-image: url(${logo});
    background-size: cover;
    width: 30px;
    height: 30px;
`;
const buttonStyle: React.CSSProperties = {
    all: "unset",
    borderRadius: "15px",
    color: "yellow",
    backgroundColor: "inherit",
    border: "none",
    padding: "10px 0",
    marginLeft: "8px",
    cursor: "pointer",
};
const SOCIAL_SIGNUP_MUTATION = gql`
    mutation socialSignUp($username: String!, $email: String!, $provider: String!) {
        socialSignUp(username: $username, email: $email, provider: $provider) {
            ok
            token
            error
        }
    }
`;
const SocialLogin = () => {
    const history = useHistory();
    const onCompleted = (data: any) => {
        const { socialSignUp: {ok,token,error}} = data;
        if(!ok) {
            alert(error);
        }
        if(token){
            logUserIn(token);
            history.push("/");
        }
    };
    const [socialSignUp]= useMutation(SOCIAL_SIGNUP_MUTATION, { onCompleted });
    const onSuccess = (res: any) => {
        const {profile: {properties: {nickname}, kakao_account:{ email }}} = res;
        socialSignUp(
            {variables: {username: `${nickname}_kakao`, email: email, provider: "kakao" } }
        );
    };
    return(
        <Container><Logo></Logo><KaKaoLogin style={buttonStyle} token="b4114347af38d931248d58b6e34262fd" onSuccess={onSuccess} onFail={console.error} useLoginForm ></KaKaoLogin>
        </Container>
    );
};
export default SocialLogin;