import React, {useEffect} from "react";
import { PaginationItem, Pagination } from "@material-ui/lab";
import useStyles from "./pagination.style.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts.action.js";

function Paginate({page}) {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {numberOfPages} = useSelector((state) => state.postsReducer);
  useEffect(() => {
    if(page) {
      dispatch(getPosts(page))
    }
  }, [page])
  return (
    <Pagination
      classes={{ ul: styles.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts/?page=${item.page}`} />
      )}
    />
  );
}

export default Paginate;
