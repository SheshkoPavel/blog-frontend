import React from 'react';
import {commentsArray} from "../../types/commentsTypes";
import './CommentItem.scss'

const CommentItem = ({id, author, text, postId}: commentsArray) => {
    return (
        <div>
            <div className={'author__line'}> <span>{author}</span></div>
            <div className={'comment'}>{text}</div>
        </div>
    );
};

export default CommentItem;