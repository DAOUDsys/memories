import React, { useEffect, useState } from "react";
import Posts from "../posts/posts.jsx";
import Form from "../form/form.jsx";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Paginate from "../pagination/pagination.jsx";
import useStyles from "./home.style.js";
import { useDispatch } from "react-redux";
import { getPosts, searchPosts } from "../../actions/posts.action.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const styles = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;

  useEffect(() => {
    dispatch(getPosts(page));
  }, [currentId, dispatch]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (x) => {
    setTags(tags.filter((tag) => tag !== x));
  };
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(searchPosts({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };
  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={styles.gridContainer}
        >
          <Grid item xs={12} md={9} sm={6}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={styles.appBarSearch}
              position="static"
              color="white"
            >
              <TextField
                name="search"
                label="Search Memories"
                variant="outlined"
                onKeyDown={handleOnKeyDown}
                fullWidth
                value={search}
                onChange={handleSearch}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                variant="outlined"
                className={styles.searchButton}
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={styles.pagination} elevation={6}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
