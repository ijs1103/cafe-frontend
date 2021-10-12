import styled from "styled-components";
import kakao_login from "../assets/kakao_login.png";
import { useEffect } from "react";
//import axios from "axios";

// const api = axios.create({
//   method: "post",
//   url: process.env.KAKAO_LOGIN_API_URL,
//   data: { }
// });

const { Kakao } = window;
const KaKaoLogin = styled.div``;
const handleKakaoClick = () => {
    Kakao.Auth.login({
        success: (res: Object) => {

        },
        fail: (err: Object) => {

        },
    });
};
const SocialLogin = () => {
    useEffect(()=>{
        Kakao.init(process.env.REACT_APP_KAKAO);
        console.log(Kakao.isInitialized());
    }, []);
    return(
        <KaKaoLogin onClick={handleKakaoClick}>
            <img src={kakao_login} alt="kakao login" />
        </KaKaoLogin>);
};
export default SocialLogin;