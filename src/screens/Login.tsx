import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "../components/PageTitle";
import { InputDiv, ClearIcon, Input, Label} from "../components/InputElements";
import { logUserIn } from "../apollo";
import InputError from "../components/InputError";
import AuthLayOut from "../components/AuthLayOut";
import Button from "../components/Button";
import MessageBox from "../components/MessageBox";
import SocialLogin from "../components/SocialLogin";

const LoginSavedFindPw = styled.div`
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #b3b3b3;
`;
const LoginSaved = styled.div`
    position: relative;
`;
const CheckBox = styled.input`
    width: 20px;
    height: 20px;
    background-color: white;
`;
const Span = styled.span`
    position: absolute;
    top: 22%;
    width: 100px;
`;
const FindPw = styled.span``;
const BottomBox = styled.div`
    padding-top: 10px;
    color: #737373;
    border-top: 1px solid #737373;;
    font-size: 18px;
`;
const SignUp = styled.div`
    margin-top: 5px;
`;
const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String) {
        login(username: $username, password: $password) {
        ok
        token
        error
        }
    }
`;
export default function Login() {
    const [id_focused, id_setFocused] = useState(false);
    const [id_filled, id_setFilled] = useState(false);
    const [pw_focused, pw_setFocused] = useState(false);
    const [pw_filled, pw_setFilled] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    interface IuseLocation{
        username: string,
        password: string
    }
    const location = useLocation<IuseLocation>();
    const history = useHistory();
    const { register, handleSubmit, errors, formState, setValue, getValues, setError, clearErrors } = useForm({
        mode: "onChange",
        defaultValues: {
            username: location?.state?.username || localStorage.getItem("id") || "",
            password: location?.state?.password || "",
            result: ""
        },
    });
    const onCompleted = (data: any) => {
        const { login: {ok, error, token}} = data;
        if(!ok) {
            setError("result", {message: error});
        }
        if(token) {
            isChecked ? localStorage.setItem("id", getValues().username) : localStorage.removeItem("id");
            logUserIn(token);
            history.push("/");
        }
    };
    const [login, {loading}] = useMutation(LOGIN_MUTATION, { onCompleted });
    const onSubmitValid = (data: any) => {
        if(loading) return;
        const { username, password } = getValues();
        login({variables: {username, password}})
    };
    const clearLoginError = () => clearErrors("result");
    const { username, password } = getValues();
    useEffect(()=>{
        username!=="" ? id_setFilled(true) : id_setFilled(false);
        password!=="" ? pw_setFilled(true) : pw_setFilled(false);
    },[username, password]);
    return(
        <>
        <MessageBox message={errors?.result?.message} />
        <AuthLayOut title="로그인">
             <PageTitle title="로그인"></PageTitle>
            <form onSubmit={handleSubmit(onSubmitValid)}style={{"paddingTop": "30px"}}>
                                 <InputDiv >
                                         <Input ref={register({required: "아이디가 비어있습니다.", minLength: {value: 5, message: "id는 최소 5글자입니다."}})} onChange={clearLoginError} type="text" 
             focused={id_focused || id_filled} onFocus={()=>id_setFocused(true)} onBlur={()=>{!id_filled && id_setFocused(false);}} id="username" name="username"/>
                                         <Label focused={id_focused || id_filled} htmlFor="username">아이디</Label>
                                     <ClearIcon onClick={()=>{setValue("username", "",{shouldValidate: true});id_setFocused(false);}} active={id_filled} ><FontAwesomeIcon icon={faTimesCircle} size="lg"/></ClearIcon>
                                     <InputError message={errors?.username?.message}/>
                                 </InputDiv>
                                
                                 <InputDiv style={{"marginTop": "30px"}}>
                                     <Input ref={register({required: "비밀번호가 비어있습니다.",})} onChange={clearLoginError} type="password" focused={pw_focused} onFocus={()=>pw_setFocused(true)} onBlur={()=>{!pw_filled && pw_setFocused(false);}} id="password" name="password" />
                                     <Label focused={pw_focused} htmlFor="password">비밀번호</Label>
                                     <ClearIcon onClick={()=>{setValue("password", "",{shouldValidate: true});pw_setFocused(false);}} active={pw_filled}><FontAwesomeIcon icon={faTimesCircle} size="lg"/></ClearIcon>
                                     <InputError message={errors?.password?.message}/>
                                 </InputDiv>
                                
                                 <Button type="submit" style={{"marginTop": "30px"}} value={loading ? "로딩중" : "로그인"} disabled={!formState.isValid || loading}></Button>
                                 <LoginSavedFindPw>
                                     <LoginSaved><CheckBox type="checkbox" onChange={()=>setIsChecked(!isChecked)}/><Span>아이디 저장</Span></LoginSaved>
                                     <FindPw>아이디/비밀번호 찾기</FindPw>
                                 </LoginSavedFindPw>
                         </form>
                     <BottomBox>
                         <SocialLogin />
                         <SignUp>회원이 아직 아니세요? <Link to="/signup"><strong style={{"color": "white"}}>즉시 가입</strong></Link></SignUp>                     
                  </BottomBox>
        </AuthLayOut>
        </>
    );
}