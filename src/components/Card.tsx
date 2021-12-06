import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import useUser from "./customHook/useUser";
import Map from "./Map";
import BtnCategory from "./Btn_Category";
import GlassContainer from "./GlassCard";
import { gql, useMutation } from "@apollo/client";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fullStar, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "./ModalElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noImage from "../assets/noImage.png";
import Button from "./Button";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import MessageBox from "../components/MessageBox";

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            ok
            error
        }
    }
`;
const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($shopId: Int!, $payload: String!){
        createComment(shopId: $shopId, payload: $payload){
            ok
            id
            error
        }
    }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      id
      error
    }
  }
`;
const UPDATE_COMMENT_MUTATION = gql`
  mutation editComment($id: Int!, $payload: String!) {
    editComment(id: $id, payload: $payload){
        ok
        id
        error
    }
  }
`;
interface Icard {
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
    width: 800px;
    height: 500px;
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
    margin: 0 auto;
    width: 800px;
    height: 500px;
    border-radius: 20px;
    position: relative;
    padding: 20px 30px;
    color: white;
`;
const ImageDiv = styled.div`
    width: 50%;
    height: 500px;
    padding: 20px;
`;
const Image = styled.div<{ bgImage: string }>`
    border-radius: 5px;
    background-image: url(${props => props.bgImage ? props.bgImage : noImage});
    background-position: center center;
    background-size: cover;
    height: 400px;
    position: relative;
`;
const Category = styled.ul`
    display: flex;
    margin-top: 5px;
    flex-wrap: wrap;
`;
const Content = styled.div`
    width: 50%;
    padding: 20px 20px 0 0;
    position: relative;
`;
const Title = styled.h1`
    font-size: 40px;
    font-weight: 700;
    color: white;
`;
const Owner = styled.h2`
    font-size: 18px;
    margin-top: 25px;
    font-weight: 600;
    color: #eee8d4
`;
const LikeBtn = styled.span`
    position: absolute;
    top: 20px; 
    right: 20px;
    cursor: pointer;
`;
const Likes = styled.span`
    position: absolute;
    right: 25px;
    top: 80px;
    color: yellow;
`;
const Comments = styled.div`
    margin-top: 10px;
    height: 350px;
    padding: 12px;
    width: 85%;
    overflow-y: scroll;
`;
const Comment = styled.div`
    display: flex;
    padding: 30px 10px 10px 15px;
    border-bottom: 2px white solid;
    position: relative;
`;
const User = styled.div`
    font-weight: 600;
    font-size: 20px;
    position: absolute;
    top: 5px;
    left: 15px;
`;
const Payload = styled.div`
    font-size: 16px;
    padding-top: 10px;
`;
const CommentCnt = styled.div`
    position: absolute;
    top: 90px;
    right: 30px;
`;
const ToggleBtn = styled.span`
    position: absolute;
    top: 155px;
    right: 22px;
    border-radius: 10px;
    border: white solid 2px;
    color: white;
    padding: 7px 20px;
    height: 34px;
    cursor: pointer;
    &:hover{
        border: ${props => props.theme.btHover} solid 2px;
        color: ${props => props.theme.btHover};
        transition: all .3s;
    }
`;
const CommentInput = styled.textarea`
    all: unset;
    box-sizing: border-box;
    padding: 15px;
    font-size: 25px;
    width: 100%;
    height: 85%;
    background-color: white;
    &::placeholder {
        font-size: 30px;
    }
`;
const Edit = styled.div`
    position: absolute;
    top: 5px;
    right: 50px;
`;
const Delete = styled.div`
    position: absolute;
    top: 5px;
    right: 15px;
`;
const Review = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;
const ReviewBtn = styled(Button)`
    width: 200px;
    background-color: white;
    color: #817862;
`;
const ModalDiv = styled.div`
    background-color: #817862;
    width: 400px;
    height: 400px;
    border-radius: 10px;
    padding: 20px;
`;
const ModalBtn = styled(Button)`
    margin-top: 10px;
`;

const Card: React.FC<Icard> = ({ photos, id, name, user, address, categories, isLiked, likes, comments, commentNumber }) => {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const [toggleOn, setToggleOn] = useState(false);
    const [modalOn, setModalOn] = useState(false);
    const [updateCommentId, setUpdateCommentId] = useState(0);
    const [updateModalOn, setUpdateModalOn] = useState(false);
    const [payload, setPayload] = useState("");
    const [updatePayload, setUpdatePayload] = useState("");
    const [error, setError] = useState("");
    const { data: userData } = useUser();

    useEffect(
        ()=>{

        }, [error]    
    )
    const updateToggleLike = (cache: any, result: any) => {
        const {
            data: {
                toggleLike: { ok },
            },
        } = result;
        if (ok) {
            const fragmentId = `CoffeeShop:${id}`;
            cache.modify({
                id: fragmentId,
                fields: {
                    isLiked(prev: any) {
                        return !prev;
                    },
                    likes(prev: any) {
                        if (isLiked) {
                            return prev - 1;
                        }
                        return prev + 1;
                    },
                }
            })
        }
    };
    const commentUpdate = (cache: any, result: any) => {
        const { data: { createComment: { ok, id: commentId } } } = result;
        if (ok && userData?.me) {
            const newComment = {
                __typename: "Comment",
                createdAt: Date.now() + "",
                id: commentId,
                isMine: true,
                payload,
                user: {
                    ...userData.me,
                }
            };
            const newCacheComment = cache.writeFragment({
                data: newComment,
                fragment: gql`
                    fragment sameName on Comment {
                        id
                        createdAt
                        isMine
                        payload
                        user {
                            username
                        }
                    }
                 `
            });
            cache.modify({
                id: `CoffeeShop:${id}`,
                fields: {
                    comments(prev: any) {
                        return [...prev, newCacheComment];
                    },
                    commentNumber(prev: any) {
                        return prev + 1;
                    }
                }
            });
        }
    };
    const updateDeleteComment = (cache: any, result: any) => {
        const { data: { deleteComment: { ok, id: CommentId } } } = result;
        if (ok && userData?.me) {
            cache.evict({ id: `Comment:${CommentId}` });
            cache.modify({
                id: `CoffeeShop:${id}`,
                fields: {
                    commentNumber(prev: any) {
                        return prev - 1;
                    }
                }
            })
        }
    };
    const updateUpdateComment = (cache: any, result: any) => {
        const { data: { editComment: { ok, id: existingId } } } = result;
        if(ok && userData?.me){                        
            cache.modify({
                id: `Comment:${existingId}`,
                fields: {
                    payload(prev: any) {
                        return updatePayload;
                    },
                }
            });
        }
    };
    const clickHandler = () => {
        toggleLike({
            variables: {
                id
            },
        });
    };
    const { register, handleSubmit } = useForm();
    const onUpdateValid = (data: any) => {
        setUpdatePayload(data.updatePayload);
        updateComment({
            variables: {
                payload: data.updatePayload,
                id: updateCommentId
            }
        })
        setUpdateModalOn(false);
    };
    const onValid = (data: any) => {
        if (loading) return;
        setPayload(data.payload);
        createComment({
            variables: {
                payload: data.payload,
                shopId: id
            }
        });
        setModalOn(false);
    };
    const onDelete = (id: number) => {
        deleteComment({
            variables: { id }
        })
    };
    const onEdit = (id: number) => {
        setUpdateCommentId(id);
        setUpdateModalOn(!updateModalOn);
    };
    const likeCompleted = (data: any) => {
        data?.toggleLike?.error && setError(data?.toggleLike?.error);
    };
    const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, { variables: { id }, update: updateToggleLike, onCompleted: likeCompleted });
    const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, { update: commentUpdate });
    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, { update: updateDeleteComment, });
    const [updateComment] = useMutation(UPDATE_COMMENT_MUTATION, { update: updateUpdateComment, });

    return (
        <>  
            <MessageBox message={error}/>
            <FlipCard toggle={toggleOn}>
                <FlipCardInner toggle={toggleOn}>
                    <Front toggle={toggleOn}>
                        <GlassContainer>
                            <ImageDiv>
                                <Image bgImage={photos[0]?.url}>
                                </Image>
                                <Category>{categories[0].name.split(" ").map((str: string, idx: number) =>
                                    <BtnCategory key={idx} text={str} />
                                )}</Category>
                            </ImageDiv>
                            <Content>
                                <Title>{name}</Title>
                                <Owner>{user.username}의 카페</Owner>
                                <Owner>{address}</Owner>
                                <Map hasMarker={false} style={{ "height": "265px", "marginTop": "50px", "borderRadius": "5px" }} addr={address} />
                                <LikeBtn onClick={clickHandler}><FontAwesomeIcon style={{ "color": "yellow" }} icon={isLiked ? fullStar : faStar} size="3x" /></LikeBtn>
                                <Likes>{likes > 1 ? `${likes} likes` : `${likes} like`}</Likes>
                                <ToggleBtn onClick={() => setToggleOn(!toggleOn)}>{toggleOn ? "뒤집기" : "리뷰보기"}</ToggleBtn>
                            </Content>
                        </GlassContainer>
                    </Front>
                    <Back toggle={toggleOn}>
                        <BackContainer>
                            <Title>Review</Title>
                            <Comments>
                                {comments.map((comment: any, idx: number) =>
                                    <Comment key={idx}>
                                        <User >{comment.user.username}</User>
                                        <Payload >{comment.payload}</Payload>
                                        {comment.isMine ? <><Edit onClick={() => onEdit(comment.id)}><FontAwesomeIcon style={{ "cursor": "pointer" }} icon={faEdit} size="lg" /></Edit><Delete onClick={() => onDelete(comment.id)}><FontAwesomeIcon style={{"cursor": "pointer"}} icon={faTrashAlt} size="lg" /></Delete></> : null}
                                    </Comment>
                                )}
                            </Comments>
                            <CommentCnt>댓글수: {commentNumber}개</CommentCnt>
                            <ToggleBtn onClick={() => setToggleOn(!toggleOn)}>뒤집기</ToggleBtn>
                            {isLoggedIn && <Review><ReviewBtn onClick={() => setModalOn(!modalOn)} type="button" value="후기 작성" /></Review>}
                        </BackContainer>
                    </Back>
                </FlipCardInner>
            </FlipCard>
           
                <Modal active={updateModalOn} clickHandler={() => setUpdateModalOn(!updateModalOn)}>
                    <ModalDiv>
                        <CommentInput placeholder="리뷰를 수정해주세요 ..." ref={register({ required: true })} name="updatePayload"></CommentInput>
                        <ModalBtn type="submit" value="수정" onClick={handleSubmit(onUpdateValid)} />
                    </ModalDiv>
                </Modal>
           
            <form onSubmit={handleSubmit(onValid)}>
                <Modal active={modalOn} clickHandler={() => setModalOn(!modalOn)}>
                    <ModalDiv>
                        <CommentInput placeholder="리뷰를 작성해주세요 ..." ref={register({ required: true })} name="payload"></CommentInput>
                        <ModalBtn type="submit" value="작성" />
                    </ModalDiv>
                </Modal>
            </form>
        </>
    );
};
export default Card;