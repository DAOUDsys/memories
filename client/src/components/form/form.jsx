import React, { useState, useEffect } from "react";
import useStyle from './form.style.js';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { createPost, updatePost } from "../../actions/posts.action.js";
import { useNavigate } from "react-router-dom";


function Form({currentId, setCurrentId}) {
  const emptyPost = { title: '', message: '', tags: '', selectedFile: ''};
  const [postData, setPostData] = useState(emptyPost);
  const styles = useStyle();
  const post = useSelector((state) => (currentId? state.postsReducer.posts.find(p => p._id === currentId): null))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'))
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
      dispatch(updatePost(currentId, {...postData, name: user?.result.name }));
    } else {
      if(postData.title !== '' && postData.message !== '')
      dispatch(createPost({...postData, name: user?.result.name}, navigate));
    }
    clear();
  };

  if(!user?.result) {
    return (
      <Paper className={styles.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memory
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={styles.paper} elevation={6} >
      <form autoComplete="off" noValidate className={`${styles.form} ${styles.root}`} onSubmit={handleSubmit}>
        <Typography variant="h6" >{currentId ? `Edit` : `Create`} a Memory</Typography> 
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
          <Button className={styles.buttonSubmit} variant="outlined" onClick={handleSubmit} size="large" type="submit" fullWidth >Submit</Button>
          <Button className={styles.buttonClear} variant="outlined" size="small" onClick={clear} fullWidth >Clear</Button>
        </div>
      </form>
    </Paper>
  )
}

export default Form;
