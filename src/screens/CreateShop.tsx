import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
import React, {useState, useEffect} from "react";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "../components/PageTitle";
import { InputDiv, ClearIcon, Input, Label} from "../components/InputElements";
import styled from "styled-components";
import BtnCategory from "../components/Btn_Category";
import Modal from "../components/ModalElements";
import InputError from "../components/InputError";
import Button from "../components/Button";
import DaumPostcode from "react-daum-postcode";
import MessageBox from "../components/MessageBox";
import Map, { latlngVar }from "../components/Map";
import { useReactiveVar } from "@apollo/client";
const Container = styled.div`
    width: 1100px;
    margin: 0 auto;
`;
const Category = styled.div`
    padding: 20px;
`;
const Cul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const CREATE_SHOP_MUTATION = gql`
    mutation createCoffeeShop(
        $name: String!
        $latitude: String
        $longitude: String
        $url: Upload
        $categoryName: String!
    ) {
        createCoffeeShop(
            name: $name
            latitude: $latitude
            longitude: $longitude
            url: $url
            categoryName: $categoryName
        ) {
            ok
            error
        }
    }
`;
export default function SignUp() {
    interface Icategories{
        id: number, 
        payload: string
    }
    const latlng = useReactiveVar(latlngVar);
    const [name_focused, name_setFocused] = useState(false);
    const [name_filled, name_setFilled] = useState(false);
    const [categoryName_focused, categoryName_setFocused] = useState(false);
    const [categoryName_filled, categoryName_setFilled] = useState(false);
    const [address, setAddress] = useState("");
    const [active, setActive] = useState(false);
    const[categories, setCategories] = useState<Icategories[]>([]);
    const location = useLocation<IuseLocation>();
    const history = useHistory();

    interface IuseLocation{
        name: string,
        latitude: string,
        longitude: string,
        img: File,
        categoryName: string,
        address: string,
    }
    const { register, handleSubmit, errors, formState, setValue, getValues, setError, clearErrors } = useForm({
        mode: "onChange",
        defaultValues: {
            name: location?.state?.name || "",
            categoryName: location?.state?.categoryName || "",
            img: location?.state?.img || null,
            address: location?.state?.address || "",
            result: ""
        },
    });
    const onCompleted = (data:any) => {
        const {
            createCoffeeShop: { ok, error},
        } = data;
        if (!ok) {
            setError("result", {message: error});
            history.push("/add");
        } else {
            history.push("/", {
                message: "카페가 성공적으로 추가 되었습니다.",
            });
        }
    };
    const [createCoffeeShop, { loading }] = useMutation(CREATE_SHOP_MUTATION, {
        onCompleted,
    });
    const onSubmitValid = (data:any) => {
        if (loading) return;
        let str = "";
        categories.forEach(v=>str+=" "+v.payload);
        createCoffeeShop({
            variables: {
                name: data.name,
                categoryName: str,
                url: data.img,
                latitude: latlng.lat,
                longitude: latlng.lng
            },
        });
    };
    const clearError = () => clearErrors("result");

    const handleEnter = (e: any) => {
        if(e.key==='Enter'){
            e.preventDefault();
            const text = getValues().categoryName;
            setCategories([...categories, {id: categories.length, payload: text}]);
            setValue("categoryName", "");
        }
    };
    const blockEnter = (e: any) => {
        if(e.key==='Enter') e.preventDefault();
    };
    const handleClick = () => {
        setActive(!active);
        setValue("address", "" , {shouldValidate: true});
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
            setAddress(fullAddress);
          }    
      };
    useEffect(()=>{
        const { name, categoryName } = getValues();
        name!=="" ? name_setFilled(true) : name_setFilled(false);
        categoryName!=="" ? categoryName_setFilled(true) : categoryName_setFilled(false);
    },[{...getValues()}]);

    return(
        <>
        <MessageBox message={errors?.result?.message} />
            <Container>
             <PageTitle title="카페 생성"></PageTitle>
            <form onSubmit={handleSubmit(onSubmitValid)}>
                                 <InputDiv >
                                         <Input ref={register({required: "카페명이 비어있습니다.", minLength: {value: 4, message: "카페명은 최소 4글자입니다."}})} onKeyPress={blockEnter} onChange={clearError} type="text" 
             focused={name_focused} onFocus={()=>name_setFocused(true)} onBlur={()=>{!name_filled && name_setFocused(false);}} id="name" name="name"/>
                                         <Label focused={name_focused} htmlFor="name">카페명</Label>
                                     <ClearIcon onClick={()=>{setValue("name", "",{shouldValidate: true});name_setFocused(false);}} active={name_filled} ><FontAwesomeIcon icon={faTimesCircle} size="lg"/></ClearIcon>
                                     <InputError message={errors?.name?.message}/>
                                 </InputDiv>
                                 <InputDiv>
                                     <Input onKeyPress={handleEnter} ref={register} onChange={clearError} type="categoryName" focused={categoryName_focused} onFocus={()=>categoryName_setFocused(true)} onBlur={()=>{!categoryName_filled && categoryName_setFocused(false);}} id="categoryName" name="categoryName" />
                                     <Label focused={categoryName_focused} htmlFor="categoryName">엔터를 눌러서 카테고리 추가.</Label>
                                     <ClearIcon onClick={()=>{setValue("categoryName", "",{shouldValidate: true});categoryName_setFocused(false);}} active={categoryName_filled}><FontAwesomeIcon icon={faTimesCircle} size="lg"/></ClearIcon>
                                 </InputDiv>
                                 <Category>
                                    <Cul>{categories.length>0 && categories.map((category) => <BtnCategory key={category.id} text={category.payload} close={()=>setCategories([...categories.filter(x => x.id!==category.id)])}/>)}</Cul>
                                 </Category>
                                <Input ref={register} type='file' multiple accept='image/jpg,impge/png,image/jpeg,image/gif' name='img' />
                                <InputDiv>
                                    <Modal active={active} clickHandler={()=>setActive(!active)}><DaumPostcode onComplete={handleComplete} /></Modal>
                                    <div style={{"display": "flex"}}>
                                        <Input ref={register({required: "주소를 선택해주세요."})} type="text" onChange={clearError} style={{"width": "70%", "borderRadius": "10px 0 0 10px", "fontSize": "15px", "padding": "10px"}} name="address" readOnly />
                                        <Button style={{"width": "30%", "borderRadius": "0 10px 10px 0"}} onClick={handleClick} value="주소 찾기" readOnly/>
                                    </div>
                                    <InputError message={errors?.address?.message}/>
                                </InputDiv>
                                <Map addr={address}/>
                                 <Button style={{"marginTop": "30px"}} type="submit" value={loading ? "로딩중" : "가입"} disabled={!formState.isValid || loading}></Button>
                         </form>
            </Container>         
        </>
    );
}