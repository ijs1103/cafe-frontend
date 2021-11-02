import styled from "styled-components";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Edit = styled.div`
    position: absolute;
    top: 5px;
    right: 15px;
    cursor: pointer;
`;
const CommentDiv = styled.div`
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
interface Icomment{
    id: number;
    payload: string;
    isMine: boolean;
    user: any;
    handleEdit: () => void;
    handleDelete: () => void;
}
const Comment: React.FC<Icomment> = ({id, payload, isMine, user, handleEdit, handleDelete}) => {
    return (<CommentDiv>
        <User>{user.username}</User>
        <Payload>{payload}</Payload>
        {isMine ? <Edit><FontAwesomeIcon onClick={handleEdit} style={{ "marginRight": "10px" }} icon={faEdit} size="lg" /><FontAwesomeIcon onClick={handleDelete} icon={faTrashAlt} size="lg" /></Edit> : null}
    </CommentDiv>);
};
export default Comment;