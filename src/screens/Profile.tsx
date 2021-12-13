import {useState} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ContentLayOut from "../components/ContentLayOut";
import { gql, useQuery } from "@apollo/client";
import CardContainer from "../components/CardContainer";
import useUser from "../components/customHook/useUser";
import NotFound from "../components/NotFound";

const SEE_MYSHOPS_QUERY = gql`
    query seeShopById($UserId: Int!){
        seeShopById(UserId: $UserId){
            id
            name
            address
            user{
                username
            }
            categories{
                id
                name
            }
            photos{
                url
            }
            likes
            commentNumber
        }
    }
`;
const SEE_MYLIKES_QUERY = gql`
    query seeMyLikes($userId: Int!){
        seeMyLikes(userId: $userId){
            id
            shop{
                id
                name
                address
                categories{
                    id
                    name
                }
                photos{
                    url
                }
                user{
                    username
                }
                likes
                commentNumber
                isLiked
            }
        }
    }
`;
const Title = styled.h1`
    font-size: 50px;
    color: white;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    grid-gap: 30px;
`;
const Inner = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
`;
const SubMenu = styled.div`
    display: flex;
    justify-content: center;
    color: gray;
    border-top: 1px solid gray;
`;
const Tab = styled.div<{current: boolean}>`
    border-top: ${props => props.current ? "white solid 1px" : null};
    color: ${props => props.current && "white"};
    font-size: 30px;
    padding-top: 15px;
    cursor: pointer;
`;

const Profile = () => {
    const [tab, setTab] = useState(1);
    const { username } = useParams<{username: string}>();
    const {data: userData } = useUser();
    const {data} = useQuery(SEE_MYSHOPS_QUERY, {variables: {UserId: userData?.me?.id}, skip: tab===2});
    const {data: myLikesData} = useQuery(SEE_MYLIKES_QUERY, {variables: {userId: userData?.me?.id}, skip: tab===1 });
    console.log(myLikesData);
    return( 
        <ContentLayOut title="마이페이지">
            <Inner>
                <Title>{username}님 환영합니다.</Title>
            </Inner>
            <SubMenu>
                <Tab current={tab===1} onClick={()=>setTab(1)}>내 카페</Tab>
                <Tab style={{"marginLeft": "20px"}} current={tab===2} onClick={()=>setTab(2)}>내 찜목록</Tab>
            </SubMenu>
            <Grid>
                {tab===1 ? data?.seeShopById?.map((shop: any, idx: number) => <CardContainer key={idx} {...shop} />)
                : myLikesData?.seeMyLikes?.map((like: any, idx: number) => like.shop.isLiked && <CardContainer key={idx} user={like.user} {...like.shop} deleteButtonOff={true}/>)}    
            </Grid>
            {(data?.seeShopById?.length===0 || myLikesData?.seeMyLikes?.length===0) && <NotFound />}
        </ContentLayOut>
    );
};
export default Profile;