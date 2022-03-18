import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputDiv, ClearIcon, Input, Label } from "../components/InputElements";
import styled from "styled-components";
import BtnCategory from "../components/Btn_Category";
import Modal from "../components/ModalElements";
import InputError from "../components/InputError";
import Button from "../components/Button";
import DaumPostcode from "react-daum-postcode";
import MessageBox from "../components/MessageBox";
import Map from "../components/Map";
import ContentLayOut from "../components/ContentLayOut";
const Container = styled.div`
    width: 1100px;
    margin: 0 auto;
    padding: 0 300px;
`;
const Category = styled.div`
    padding: 20px;
    margin-bottom: 20px;
    border-left: solid black 3px;
    border-right: solid black 3px;
    border-bottom: solid black 3px;
    border-radius: 0 0 5px 5px;
`;
const Cul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const CREATE_SHOP_MUTATION = gql`
    mutation createCoffeeShop(
        $name: String!
        $address: String
        $url: Upload
        $categoryName: String!
    ) {
        createCoffeeShop(
            name: $name
            address: $address
            url: $url
            categoryName: $categoryName
        ) {
            ok
            error
        }
    }
`;
export default function SignUp() {
    interface Icategories {
        id: number,
        payload: string
    }
    const [name_focused, name_setFocused] = useState(false);
    const [name_filled, name_setFilled] = useState(false);
    const [categoryName_focused, categoryName_setFocused] = useState(false);
    const [categoryName_filled, categoryName_setFilled] = useState(false);
    const [address, setAddress] = useState("");
    const [active, setActive] = useState(false);
    const [categories, setCategories] = useState<Icategories[]>([]);
    const history = useHistory();

    const { register, handleSubmit, errors, formState, setValue, getValues, setError, clearErrors } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            address: "",
            categoryName: "",
            result: "",
            file: null,
        },
    });

    const onCompleted = (data: any) => {
        const {
            createCoffeeShop: { ok, error },
        } = data;
        if (!ok) {
            setError("result", { message: error });
            setValue("name", "");
            setValue("address", "");
        } else {
            history.push("/");
        }
    };
    const [createCoffeeShop, { loading }] = useMutation(CREATE_SHOP_MUTATION, {
        onCompleted,
    });
    const onSubmitValid = (data: any) => {
        if (loading) return;
        let str = "";
        categories.forEach((curr) => str+=curr.payload+" ");
        createCoffeeShop({
            variables: {
                name: data.name,
                categoryName: str,
                url: data.img[0],
                address: data.address
            },
        });
    };
    const clearError = () => clearErrors("result");
    const mapStyle: React.CSSProperties = { width: "100%", height: "400px", borderRadius: "10px", marginTop: "30px" };
    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const text = getValues().categoryName;
            setCategories([...categories, { id: categories.length, payload: text }]);
            setValue("categoryName", "");
        }
    };
    const blockEnter = (e: any) => {
        if (e.key === 'Enter') e.preventDefault();
    };
    const handleClick = () => {
        setActive(!active);
        setValue("address", "", { shouldValidate: true });
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
            setValue("address", fullAddress, { shouldValidate: true });
            setAddress(fullAddress);
        }
    };
    const { name, categoryName } = getValues();
    useEffect(() => {
        name !== "" ? name_setFilled(true) : name_setFilled(false);
        categoryName !== "" ? categoryName_setFilled(true) : categoryName_setFilled(false);
    }, [name, categoryName]);

    return (
        <ContentLayOut title="매장 등록" bgColor="#524a3f">
            <MessageBox message={errors?.result?.message} />
            <Container>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <InputDiv >
                        <Input ref={register({ required: "카페명이 비어있습니다.", minLength: { value: 3, message: "카페명은 최소 3글자입니다." }, maxLength: { value: 9, message: "카페명은 최대 9글자입니다." } })} onKeyPress={blockEnter} onChange={clearError} type="text"
                            focused={name_focused} onFocus={() => name_setFocused(true)} onBlur={() => { !name_filled && name_setFocused(false); }} id="name" name="name" />
                        <Label focused={name_focused} htmlFor="name">카페명</Label>
                        <ClearIcon onClick={() => { setValue("name", "", { shouldValidate: true }); name_setFocused(false); }} active={name_filled} ><FontAwesomeIcon icon={faTimesCircle} size="lg" /></ClearIcon>
                        <InputError message={errors?.name?.message} />
                    </InputDiv>
                    <InputDiv>
                        <Input onKeyPress={handleEnter} ref={register()} onChange={clearError} type="categoryName" focused={categoryName_focused} onFocus={() => categoryName_setFocused(true)} onBlur={() => { !categoryName_filled && categoryName_setFocused(false); }} id="categoryName" name="categoryName" />
                        <Label focused={categoryName_focused} htmlFor="categoryName">엔터를 눌러서 카테고리 추가.</Label>
                        <ClearIcon onClick={() => { setValue("categoryName", "", { shouldValidate: true }); categoryName_setFocused(false); }} active={categoryName_filled}><FontAwesomeIcon icon={faTimesCircle} size="lg" /></ClearIcon>
                    </InputDiv>
                    <Category>
                        <Cul>{categories.length > 0 && categories.map((category) => <BtnCategory key={category.id} text={category.payload} close={() => setCategories([...categories.filter(x => x.id !== category.id)])} />)}</Cul>
                    </Category>
                    <Input ref={register} type='file' name='img' />
                    <InputDiv>
                        <Modal active={active} clickHandler={() => setActive(!active)}><DaumPostcode onComplete={handleComplete} /></Modal>
                        <div style={{ "display": "flex" }}>
                            <Input ref={register({ required: "주소를 선택해주세요." })} type="text" onChange={clearError} style={{ "width": "70%", "borderRadius": "10px 0 0 10px", "fontSize": "18px", "padding": "10px" }} name="address" readOnly />
                            <Button style={{ "width": "30%", "borderRadius": "0 10px 10px 0" }} onClick={handleClick} value="주소 검색" readOnly />
                        </div>
                        <InputError message={errors?.address?.message} />
                    </InputDiv>
                    <Map style={mapStyle} addr={address} />
                    <Button style={{ "marginTop": "30px" }} type="submit" value={loading ? "로딩중" : "등록"} disabled={!formState.isValid || loading}></Button>
                </form>
            </Container>
        </ContentLayOut>
    );
}