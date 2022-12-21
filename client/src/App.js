import React, {useEffect, useState} from "react";
import memories from "../src/images/memories.png";
import Posts from "./components/posts/posts.jsx";
import Form from "./components/form/form.jsx";
import useStyles from "./App.style.js";
import {useDispatch} from 'react-redux';
import {getPosts} from './actions/posts.action.js'
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

const App = () => {
  const styles = useStyles();
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  },[currentId,dispatch])
  return (
    <Container maxWidth="lg">
      <AppBar className={styles.appBar} position="static" color="inherit">
        <div className={styles.div}>
          <Typography variant="h2" align="center" className={styles.heading}>
            Memories
          </Typography>
          <img
            className={styles.image}
            src={memories}
            alt="memories"
            height="60"
          />
        </div>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className={styles.mainContainer}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
