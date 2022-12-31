import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Card } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./post_details.style.js";
import { addComment } from "../../actions/posts.action.js";

function Comments({ post }) {
  const styles = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const commentsRef = useRef();

  const handleClick = () => {
    const finalComment = `${user.result.name}: ${comment}`;
    dispatch(addComment(finalComment, post._id));
    const c= comments;
    c.push(finalComment);
    setComments(c);
    setComment('');

    commentsRef.current.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <Card elevation={10} className={styles.container}>
      <div>
        <div className={styles.commentsOuterContainer}>
          <div className={styles.commentsInnerContainer}>
            <Typography
              gutterBottom
              variant="h6"
              color="primary"
              style={{ fontSize: 25 }}
            >
              Comments
            </Typography>
            {comments.map((comment, index) => (
              <Typography
                key={index}
                gutterBottom
                variant="subtitle2"
                style={{
                  border: "rgb(232, 232, 232) 1px solid",
                  borderRadius: 50,
                  padding: 5,
                }}
              >
                <strong>{comment.split(':')[0]}:</strong> {comment.split(':')[1]}
              </Typography>
            ))}
            <div ref={commentsRef} />
          </div>
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              className={styles.TextField}
              fullWidth
              maxRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {!user && (
              <div className={styles.divv}>
                {" "}
                you should register to enable commenting
              </div>
            )}
            <Button
              className={styles.buttonSubmit}
              fullWidth
              variant="outlined"
              disabled={!comment || !user}
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Comments;
