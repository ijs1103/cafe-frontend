import React, { useState } from "react";
import styled from "styled-components";
import GlassContainer from "./GlassCard";
import noImage from "../assets/noImage.png";
import useUser from "./customHook/useUser";
import { gql, useMutation } from "@apollo/client";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BtnCategory from "./Btn_Category";

const SHOP_DELETE_MUTATION = gql`
    mutation deleteCoffeeShop($id: Int!){
        deleteCoffeeShop(id: $id){
            ok
            error
        }
    }
`;
const FlipCardInner = styled.div<{ toggle: boolean }>`
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease-out;
    transform-style: preserve-3d;
    transform: ${props => props.toggle && "rotateY(180deg)"};
`;
const FlipCard = styled.div<{ toggle: boolean }>`
    margin: 0 auto;
    width: 300px;
    height: 300px;
    background-color: transparent;
    perspective: 1000px;
    transform: ${props => props.toggle && "rotateY(360deg)"}; 
`;
const Front = styled.div<{ toggle: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: ${props => props.toggle && "none"};
`;
const Back = styled.div<{ toggle: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    display: ${props => !props.toggle && "none"};
`;
const BackContainer = styled.div`
    background-color: #817862;
    border:1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    margin: 0 auto;
    width: 300px;
    height: 300px;
    border-radius: 20px;
    position: relative;
    padding: 20px 30px;
    color: white;
`;
const ImageDiv = styled.div`
    width: 100%;
    height: 300px;
    padding: 15px;    
`;
const Image = styled.div<{ bgImage: string }>`
    background-image: url(${props => props.bgImage ? props.bgImage : noImage});
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 270px;
    position: relative;
`;
const Lists = styled.div`
`;
const Ul = styled.ul`
`;
const Li = styled.li`
    padding: 10px;
    font-size: 25px;
    border-bottom: 1px solid white;
    position: relative;
`;
const CatDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
`;
interface Icardcontainer{
    photos: any;
    id: number;
    name: string;
    user: any;
    address: string;
    categories: any;
    isLiked: boolean;
    likes: number;
    commentNumber: number;
    comments: any;
}
const CardContainer: React.FC<Icardcontainer> = ({photos, id, name, user, address, categories, isLiked, likes, comments, commentNumber}) => {
    const [toggleOn, setToggleOn] = useState(false);
    const { data: userData } = useUser();
    const deleteUpdate = (cache:any , result: any) => {
        const { data: { deleteCoffeeShop: { ok } } } = result;
        if (ok && userData?.me) {
            cache.evict({ id: `CoffeeShop:${id}` });
            cache.modify({
                id: `CoffeeShop:${id}`,
            })
        }
    };
    const handleDelete = () => {
        if(window.confirm("정말로 삭제하시겠습니까?")) deleteCoffeeShop();
    };
    const [deleteCoffeeShop] = useMutation(SHOP_DELETE_MUTATION, {update: deleteUpdate, variables:{id}});
    return (
        <>
            <FlipCard toggle={toggleOn}>
                <FlipCardInner toggle={toggleOn}>
                    <Front toggle={toggleOn} onClick={() => setToggleOn(!toggleOn)}>
                        <GlassContainer>
                            <ImageDiv>
                                <Image bgImage={photos[0]?.url}/>
                            </ImageDiv>
                        </GlassContainer>
                    </Front>
                    <Back toggle={toggleOn} onClick={() => setToggleOn(!toggleOn)}>
                        <BackContainer>
                            <Lists>
                                <Ul>
                                    <Li>{name}</Li>
                                    <Li>{user.username}</Li>
                                    <Li style={{"fontSize": "15px", "lineHeight": "1.4"}}>{address}</Li>
                                    <CatDiv>{categories[0].name.split(" ").map((category: any, idx: number) => {
                                            return (<BtnCategory key={idx} text={category} />)
                                    })}</CatDiv>
                                </Ul>
                            </Lists>
                            <FontAwesomeIcon onClick={handleDelete} style={{"position": "absolute", "bottom": "15px","right": "20px", "marginTop": "20px", "float": "right", "cursor": "pointer"}}icon={faTrashAlt} size="2x" />
                        </BackContainer>
                    </Back>
                </FlipCardInner>
            </FlipCard>
        </>
    );
};
export default CardContainer;