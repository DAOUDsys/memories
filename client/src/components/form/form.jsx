import React, { useState, useEffect } from "react";
import useStyle from './form.style.js';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { createPost } from "../../actions/posts.action.js";
import { updatePost } from "../../actions/posts.action.js";


function Form({currentId, setCurrentId}) {
  const emptyPost = {creator: '', title: '', message: '', tags: '', selectedFile: ''};
  const [postData, setPostData] = useState(emptyPost);
  const styles = useStyle();
  const post = useSelector((state) => (currentId? state.postsReducer.find(p => p._id === currentId): null))
  const dispatch = useDispatch();
  useEffect(() => {
    if(post) {
      setPostData(post);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  },[post])
  const clear = () => {
    setCurrentId(null);
    setPostData(emptyPost);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  }

  return (
    <Paper className={styles.paper}>
      <form autoComplete="off" noValidate className={`${styles.form} ${styles.root}`} onSubmit={handleSubmit}>
        <Typography variant="h6" >{currentId ? `Edit` : `Create`} a Memory</Typography>
        <TextField 
        name="creator" 
        variant="outlined" 
        label="Creator" 
        fullWidth
        value={postData.creator}
        onChange={(e) => setPostData({...postData, creator: e.target.value})} 
        />
        <TextField 
        name="title" 
        variant="outlined" 
        label="Title" 
        fullWidth
        value={postData.title}
        onChange={(e) => setPostData({...postData, title: e.target.value})} 
        />
        <TextField 
        name="message" 
        variant="outlined" 
        label="Message" 
        fullWidth
        value={postData.message}
        onChange={(e) => setPostData({...postData, message: e.target.value})} 
        />
        <TextField 
        name="tags" 
        variant="outlined" 
        label="Tags" 
        fullWidth
        value={postData.tags}
        onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} 
        />
        <div className={styles.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({...postData, selectedFile:base64})}
          />
          <Button className={styles.buttonSubmit} variant="contained" color="primary" onClick={handleSubmit} size="large" type="submit" fullWidth >Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
        </div>
      </form>
    </Paper>
  )
}

export default Form;
