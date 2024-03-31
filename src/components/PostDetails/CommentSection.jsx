import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const commentRef = useRef();
    const [comments, setComments] = useState(post?.comments);
    const [commentText, setCommentText] = useState('');

    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${commentText}`;
        const tmpComments = await dispatch(commentPost(finalComment, post._id));
        setComments(tmpComments);
        setCommentText('');
        commentRef.current.scrollIntoView({behaiviour : 'smooth'});
    };

    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {
                    comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            {c}
                        </Typography>
                    ))
                }
                <div ref={commentRef}></div>
            </div>
            {
                user && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="comment"
                            rows={4}
                            multiline
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <Button variant="contained" fullWidth color="primary" disabled={!commentText} style={{ marginTop: '10px' }} onClick={handleClick}>
                            Comment
                        </Button>
                    </div>
                )
            }
        </div>
    );
}

export default CommentSection;