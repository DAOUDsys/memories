import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",
  },
  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  imageSection: {
    marginLeft: "20px",
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      width: "50%",
      minWidth: 275
    },
  },
  recommendedPosts: {
    display: "flex",
    marginTop: 10,
    justifyContent: "left",
    gap: 10,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentsOuterContainer: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
    marginRight: "30px",
  },
  skeleton: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  TextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 50,
    },
  },
  buttonSubmit: {
    marginTop: 10,
    color: "white",
    fontWeight: 400,
    backgroundColor: "rgb(48, 63, 159)",
    borderRadius: 50,
    "&:hover": {
      color: "rgb(48, 63, 159)",
    },
  },
  divv: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: "10",
    color: "rgb(255, 0, 0)",
  },
  container: {
    padding: 10,
    borderRadius: 20,
  },
  recommended: {
    minWidth: 250,
  },
}));
