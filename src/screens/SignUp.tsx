import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
import {useState, useEffect} from "react";
import { faTimesCircle, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "../components/PageTitle";
import { InputDiv, ClearIcon, Input, Label} from "../components/InputElements";
import { ModalBg, Modal, ModalInner} from "../components/ModalElements";
import InputError from "../components/InputError";
import AuthLayOut from "../components/AuthLayOut";
import Button from "../components/Button";
import DaumPostcode from "react-daum-postcode";
import MessageBox from "../components/MessageBox";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $username: String!
        $email: String!
        $name: String!
        $location: String
        $password: String!
        $avatarURL: String
        $githubUsername: String
    ) {
        createAccount(
            username: $username
            email: $email
            name: $name
            location: $location
            password: $password
            avatarURL: $avatarURL
            githubUsername: $githubUsername
        ) {
            ok
            error
        }
    }
`;
export default function SignUp() {
    const [id_focused, id_setFocused] = useState(false);
    const [id_filled, id_setFilled] = useState(false);
    const [pw_focused, pw_setFocused] = useState(false);
    const [pw_filled, pw_setFilled] = useState(false);
    const [checkPw_focused, checkPw_setFocused] = useState(false);
    const [checkPw_filled, checkPw_setFilled] = useState(false);
    const [email_focused, email_setFocused] = useState(false);
    const [email_filled, email_setFilled] = useState(false);
    const [name_focused, name_setFocused] = useState(false);
    const [name_filled, name_setFilled] = useState(false);
    const [loc_focused, loc_setFocused] = useState(false);
    const [loc_filled, loc_setFilled] = useState(false);
    const [active, setActive] = useState(false);
    const location = useLocation<IuseLocation>();
    const history = useHistory();

    interface IuseLocation{
        username: string,
        password: string,
        checkPw: string,
        email: string,
        name: string,
        address: string,
        location: string,
    }
    const { register, handleSubmit, errors, formState, reset, setValue, getValues, setError, clearErrors } = useForm({
        mode: "onChange",
        defaultValues: {
            username: location?.state?.username || "",
            password: location?.state?.password || "",
            checkPw: location?.state?.checkPw || "",
            email: location?.state?.email || "",
            name: location?.state?.name || "",
            address: location?.state?.address || "",
            location: location?.state?.address || "",
            result: ""
        },
    });
    const onCompleted = (data:any) => {
        const { username, password } = getValues();
        const {
            createAccount: { ok, error},
        } = data;
        if (!ok) {
            setError("result", {message: error});
            history.push("/signup");
            setValue("username", "");
        } else {
            history.push("/login", {
                message: "회원가입 완료.로그인 해주세요.",
                username,
                password,
            });
        }
    };
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    const onSubmitValid = (data:any) => {
        if (loading) return;
        createAccount({
            variables: {
                username: data.username,
                password: data.password,
                email: data.email,
                name: data.name,
                location: data.address+" "+data.location
            },
        });
    };
    const clearSignUpError = () => clearErrors("result");
    const handleClick = () => {
      setActive(!active);
      setValue("address", "" , {shouldValidate: true});
    };
    const btnCloseStyle: React.CSSProperties = {
      position: "absolute",
      top: "-8%",
      right: "0",
      color: "white",
      cursor: "pointer"
    };
    
    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
          setActive(!active);
          setValue("address", fullAddress , {shouldValidate: true});
        }    
    };
    useEffect(()=>{
        const { username, password, checkPw, email, name, location } = getValues();
        username!=="" ? id_setFilled(true) : id_setFilled(false);
        password!=="" ? pw_setFilled(true) : pw_setFilled(false);
        checkPw!=="" ? checkPw_setFilled(true) : checkPw_setFilled(false);
        email!=="" ? email_setFilled(true) : email_setFilled(false);
        name!=="" ? name_setFilled(true) : name_setFilled(false);
        location!=="" ? loc_setFilled(true) : loc_setFilled(false);
    },[{...getValues()}]);

    return(
        <>
        <MessageBox message={errors?.result?.message} />
        <AuthLayOut title="회원가입">
             <PageTitle title="회원가입"></PageTitle>
            <form onSubmit={handleSubmit(onSubmitValid)}>
                                 <InputDiv >
                                         <Input ref={register({required: "아이디가 비어있습니다.", minLength: {value: 5, message: "id는 최소 5글자입니다."}})} onChange={clearSignUpError} type="text" 
             focused={id_focused} onFocus={()=>id_setFocused(true)} onBlur={()=>{!id_filled && id_setFocused(false);}} id="username" name="username"/>
                                         <Label focused={id_focused} htmlFor="username">아이디</Label>
                                     <ClearIcon onClick={()=>{setValue("username", "",{shouldValidate: true});id_setFocused(false);}} active={id_filled} ><FontAwesomeIcon icon={faTimesCircle} size="lg"/></ClearIcon>
                                     <InputError message={errors?.username?.message}/>
                                 </InputDiv>
                                
                                 <InputDiv>
                                     <Input ref={register({required: "비밀번호가 비어있습니다.",})} onChange={clearSignUpError} type="password" focused={pw_focused} onFocus={()=>pw_setFocused(true)} onBlur={()=>{!pw_filled && pw_setFocused(false);}} id="password" name="password" />
                                     <Label focused={pw_focused} htmlFor="password">비밀번호</Label>
                                     <ClearIcon onClick={()=>{setValue("password", "",{shouldValidate: true});setValue("checkPw", "",{shouldValidate: true});pw_setFocused(false);checkPw_setFocused(false);}} active={pw_filled}><FontAwesomeIcon icon={faTimesCircle} size="lg"/></ClearIcon>
                                     <InputError message={errors?.password?.message}/>
                                 </InputDiv>

                                 <InputDiv>
                                     <Input disabled={!pw_filled} ref={register({required: "같은 비밀번호를 입력해주세요.", validate: {same: value => value === getValues().password}})} onChange={clearSignUpError} type="password" focused={checkPw_focused} onFocus={()=>checkPw_setFocused(true)} onBlur={()=>{!checkPw_filled && checkPw_setFocused(false);}} id="checkPw" name="checkPw" />
                                     <Label focused={checkPw_focused} htmlFor="checkPw">비밀번호 확인</Label>
                                     <ClearIcon onClick={()=>{setValue("checkPw", "",{shouldValidate: true});checkPw_setFocused(false);}} active={checkPw_filled}><FontAwesomeIcon icon={faTimesCircle} size="lg"/></ClearIcon>
                                     <InputError message={(errors?.checkPw?.type === "same" && "비밀 번호가 같지 않습니다") || ""}/>
                                 </InputDiv>
                                 <InputDiv>
                                     <Input ref={register({required: "이메일이 비어있습니다.", pattern: {
            value: /\S+@\S+\.\S+/,
            message: "이메일 형식이 아닙니다."
          }})} onChange={clearSignUpError} type="email" focused={email_focused} onFocus={()=>email_setFocused(true)} onBlur={()=>{!email_filled && email_setFocused(false);}} id="email" name="email" />
                                     <Label focused={email_focused} htmlFor="email">이메일</Label>
                                     <ClearIcon onClick={()=>{setValue("email", "",{shouldValidate: true});email_setFocused(false);}} active={email_filled}><FontAwesomeIcon icon={faTimesCircle} size="lg"/></ClearIcon>
                                     <InputError message={errors?.email?.message}/>
                                 </InputDiv>
                                 <InputDiv>
                                     <Input ref={register({required: "이름이 비어있습니다.",})} onChange={clearSignUpError} type="text" focused={name_focused} onFocus={()=>name_setFocused(true)} onBlur={()=>{!name_filled && name_setFocused(false);}} id="name" name="name" />
                                     <Label focused={name_focused} htmlFor="name">이름</Label>
                                     <ClearIcon onClick={()=>{setValue("name", "",{shouldValidate: true});name_setFocused(false);}} active={name_filled}><FontAwesomeIcon icon={faTimesCircle} size="lg"/></ClearIcon>
                                     <InputError message={errors?.name?.message}/>
                                 </InputDiv>
                                 <InputDiv>
                                    {active && <ModalBg active={active}>
                                    <Modal><ModalInner><FontAwesomeIcon onClick={()=>setActive(!active)} style={btnCloseStyle} icon={faWindowClose} size="2x"/><DaumPostcode onComplete={handleComplete} /></ModalInner></Modal>
                                    </ModalBg>}
                                    <div style={{"display": "flex"}}>
                                        <Input ref={register({required: "주소를 선택해주세요."})} type="text" onChange={clearSignUpError} style={{"width": "70%", "borderRadius": "10px 0 0 10px", "fontSize": "13px", "padding": "10px"}} name="address" readOnly />
                                        <Button style={{"width": "30%", "borderRadius": "0 10px 10px 0"}} onClick={handleClick} value="주소 찾기"/>
                                    </div>
                                    <InputError message={errors?.address?.message}/>
                                </InputDiv>
                                 <InputDiv>
                                     <Input ref={register({required: "나머지 주소를 입력해주세요.",})} onChange={clearSignUpError} type="text" focused={loc_focused} onFocus={()=>loc_setFocused(true)} onBlur={()=>{!loc_filled && loc_setFocused(false);}} id="location" name="location" />
                                     <Label focused={loc_focused} htmlFor="location">상세주소</Label>
                                     <ClearIcon onClick={()=>{setValue("location", "",{shouldValidate: true});loc_setFocused(false);}} active={loc_filled}><FontAwesomeIcon icon={faTimesCircle} size="lg"/></ClearIcon>
                                     <InputError message={errors?.location?.message}/>
                                 </InputDiv>
                                 <Button style={{"marginTop": "30px"}}type="submit" value={loading ? "로딩중" : "가입"} disabled={!formState.isValid || loading}></Button>
                         </form>
        </AuthLayOut>
        </>
    );
}