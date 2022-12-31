import Post from "./post/post.jsx";
import React from "react";
import useStyle from "./posts.style.js";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const Skeletons = () => {
  return (
    <Grid container alignItems="stretch" spacing={3}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
          <Box display="inline">
            <Skeleton height={240} />
            <Skeleton animation="wave" width="80%" />
            <Skeleton height={100} animation={false} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

function Posts({ setCurrentId }) {
  const styles = useStyle();
  // state is an access to global store (root reducer) and postsReducer is a parameter used in it
  const { posts, isLoading } = useSelector((state) => state.postsReducer);
  if (posts.length < 1 && !isLoading) {
    return "No Posts Yet";
  }

  return isLoading ? (
    <Skeletons />
  ) : (
    <Grid
      className={styles.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
