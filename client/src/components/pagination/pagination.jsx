import React from "react";
import { PaginationItem, Pagination } from "@material-ui/lab";
import useStyles from "./pagination.style.js";
import { Link } from "react-router-dom";

function Paginate() {
  const styles = useStyles();
  return (
    <Pagination
      classes={{ ul: styles.ul }}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts/?page=${1}`} />
      )}
    />
  );
}

export default Paginate;
