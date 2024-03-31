import React, { useEffect } from 'react';
import { Typography, CircularProgress, Link , Avatar, Paper, Divider } from '@material-ui/core';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { getPost, getPostsBySearch } from '../../actions/posts';
import { getUser } from '../../actions/user';
import useStyles from './styles';
import CommentSection from './CommentSection';
const PostDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const { user } = useSelector(state => state.user);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    dispatch(getUser(post?.creator));
  }, [dispatch, post]);

  if (!post) return null;
  if (!user) return null;
  const openPost = (id) => history.push(`/posts/${id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter((p) => p?._id !== post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <div style={{ display: 'flex' }} component={Link} onClick={() => history.push(`/profile/${user._id}`)}>
            <Avatar alt={user.name} src={user.profilePic}>
              <Typography variant="h6">{user.name.charAt(0)}</Typography>
            </Avatar>
            <Typography variant="h6" color="inherit" gutterBottom >{user.name}</Typography>
          </div>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {
        recommendedPosts.length ? (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">You might also like:</Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {
                recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                  <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                    <Typography gutterBottom variant="h6">{title}</Typography>
                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                    <Typography gutterBottom variant="subtitle1">Likes : {likes.length}</Typography>
                    <img src={selectedFile} width="200px" alt='' />
                  </div>
                ))
              }
            </div>
          </div>
        ) : (<Typography gutterBottom variant="h5">No Recommended Posts</Typography>)
      }
    </Paper>
  )
}

export default PostDetails
