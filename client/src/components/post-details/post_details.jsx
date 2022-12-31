import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Paper, Typography, Divider, Grid } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import useStyles from "./post_details.style.js";
import { getPost, searchPosts } from "../../actions/posts.action.js";

function PostDetails() {
  const styles = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, searchResult, isLoading } = useSelector(
    (state) => state.postsReducer
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(searchPosts({ search: "none", tags: post?.tags.join(",") }));
    }
  }, [post]);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading)
    return (
      <div className={styles.Skeleton}>
        <Skeleton width={"70%"} />
        <div>
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );

  if (!post) return null;
  let recommendedPosts;
  if (searchResult) {
    console.log(searchResult);
    recommendedPosts = searchResult?.filter(({ _id }) => _id !== post?._id);
  }

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={styles.card}>
        <div className={styles.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={styles.imageSection}>
          <img
            className={styles.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts?.length && (
        <div className={styles.sections}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={styles.recommendedPosts}>
            {recommendedPosts.map((post) => {
              return <div style={{margin: '20px', cursor: 'pointer'}} onClick={() => openPost(post._id)} key={post._id}>
                <Typography gutterBottom variant="h6" >{post.title}</Typography>
                <Typography gutterBottom variant="subtitle2" >{post.name}</Typography>
                <Typography gutterBottom variant="subtitle2" >{post.message}</Typography>
                <Typography gutterBottom variant="subtitle1" >{post.likes.length}</Typography>
                <img src={post.selectedFile} width="200px" alt={`${post.title}`} />
              </div>;
            })}
          </div>
        </div>
      )}
    </Paper>
  );
}

export default PostDetails;
