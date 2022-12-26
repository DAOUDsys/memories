import Post from './post/post.jsx'
import React from "react";
import useStyle from './posts.style.js';
import {Grid, CircularProgress} from '@material-ui/core';
import { useSelector } from 'react-redux';


function Posts({setCurrentId}) {
  const styles = useStyle();
  // state is an access to global store (root reducer) and postsReducer is a parameter used in it
  const posts = useSelector((state) => state.postsReducer);
  
  return (!posts.length ? <CircularProgress /> : (
    <Grid className={styles.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  ))
}

export default Posts;
