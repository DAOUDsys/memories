import React from "react";
import useStyle from './post.style.js';
import {Card, CardActions, CardMedia, Button, CardContent, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts.action.js'


function Post({post, setCurrentId}) {
  const styles = useStyle();
  const dispatch = useDispatch();
  return (
    <Card className={styles.card} >
      <CardMedia className={styles.media} image={post.selectedFile} title={post.title} />
      <div className={styles.overlay}>
        <Typography variant="h6" >{post.creator}</Typography>
        <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={styles.overlay2}>
        <Button style={{color: 'white'}} size="small" onClick={() => {setCurrentId(post._id)}} >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <div className={styles.details} >
        <Typography variant="body2" color="textSecondary" >{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
        <Typography variant="h5" gutterBottom className={styles.title} >{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" gutterBottom color="textSecondary" component="p" >{post.message}</Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button size="small" color="primary" onClick={() => {dispatch(likePost(post._id))}} >
          <ThumbUpAltIcon fontSize="small" /> &nbsp; Like &nbsp;  {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}} >
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post;
