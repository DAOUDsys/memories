import React, { useState } from "react";
import useStyle from "./post.style.js";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  CardContent,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts.action.js";
import { Link } from "react-router-dom";

function Post({ post, setCurrentId }) {
  const styles = useStyle();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (post.likes.find((like) => like === user?.result?._id)) {
      setLikes(post.likes.filter((id) => id !== user?.result._id));
    } else {
      setLikes([...post.likes, user?.result._id]);
    }
  };

  return (
    <Card className={styles.card} raised elevation={18}>
      <CardMedia
        component={Link}
        to={`/posts/${post._id}`}
        className={styles.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={styles.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {user?.result?._id === post?.creator && (
        <div className={styles.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <div className={styles.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography variant="h5" gutterBottom className={styles.title}>
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          gutterBottom
          color="textSecondary"
          component="p"
        >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={handleLike}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {user?.result._id === post?.creator && (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
