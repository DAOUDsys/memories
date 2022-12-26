import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    justifyContent: "center",
    alignItems: "center",
  },
  div: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  appBarSearch: {
    borderRadius: 5,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection:"column-reverse",
    }
  },
  searchButton: {
    color: "white",
    fontWeight: 400,
    backgroundColor: "rgb(48, 63, 159)",
    borderRadius: 50,
    '&:hover': {
    color: "rgb(48, 63, 159)",
    }
  }
}));
