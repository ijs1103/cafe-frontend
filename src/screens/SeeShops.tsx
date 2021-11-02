import { useCallback } from "react";
import { gql, useQuery } from "@apollo/client";
import { useEffect} from "react";
import Card from "../components/Card";
import useScrollEnd from "../components/customHook/useScrollEnd";
import Loader from "../components/Loader";
import ContentLayOut from "../components/ContentLayOut";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSort} from "@fortawesome/free-solid-svg-icons";
const SEE_SHOPS_QUERY = gql`
    query seeCoffeeShops($offset: Int!, $limit: Int!, $sort: String!){
        seeCoffeeShops(offset: $offset, limit: $limit, sort: $sort){
            id
            name
            address
            user{
                username
            }
            categories{
                name
            }
            photos{
                url
            }
            isLiked
            likes
            commentNumber
            comments{
                id
                user {
                    username
                }
                payload
                isMine
                createdAt
            }
        }
    }
`;
const SortDiv = styled.div`
    color: white;
    font-size: 24px;
    margin-left: 15px;
`;
const SortTime = styled.span`
    cursor: pointer;
    &:active{
        color: yellow;
    }
`;
const SortLikes = styled.span`
    cursor: pointer;
    margin-left: 20px;
    &:active{
        color: yellow;
    }
`;
const SeeShops = () =>{
    const LIMIT = 5;
    const RECENT = "recent";
    const {loading, data, fetchMore, refetch} = useQuery(SEE_SHOPS_QUERY, {variables: {offset: 0, limit: LIMIT, sort: RECENT }});
    const scrollEnd = useScrollEnd();
    const handleScrollEnd = useCallback(() => {
        if(!scrollEnd) return;
        const currentLength = data?.seeCoffeeShops?.length;
        fetchMore({
            variables: {
                offset: currentLength,  
                limit: LIMIT,
            }
        }).then(
            (fetchMoreResult: any) => {
            }
        );
    }, [scrollEnd, data?.seeCoffeeShops, fetchMore]);
    const handleClick = (sorting: string) => {
        refetch({offset: 0, limit: LIMIT, sort: sorting});
    };
    useEffect(() => {
        handleScrollEnd();
    }, [handleScrollEnd]);
    return(
        <>  
            <ContentLayOut title="카페 보기">
                <SortDiv>
                    <SortTime onClick={()=>handleClick(RECENT)}><FontAwesomeIcon style={{"marginRight": "10px"}} icon={faSort} />최신순</SortTime>
                    <SortLikes onClick={()=>handleClick("name")}><FontAwesomeIcon style={{"marginRight": "10px"}} icon={faSort} />이름순</SortLikes>
                </SortDiv>
                {data?.seeCoffeeShops?.map((shop: any) => <Card key={shop.id} {...shop} />)}
                {loading && <Loader />}
            </ContentLayOut>
        </>
    );
};
export default SeeShops;