import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
    },
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
    [theme.breakpoints.down('sm')]: {
      marginLeft: "10",
      height: 35
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    [theme.breakpoints.down('sm')]: {
      marginRight: "50px",
      width: "300px",
    },
  },
  userName: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
      overFlow: "hidden"
    },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  logout: {
    color: "white",
    fontWeight: 400,
    backgroundColor: "rgb(255, 22, 126)",
    borderRadius: 50,
    '&:hover': {
    color: "rgb(255, 22, 126)",
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      height: 40,
    },
  },
  button: {
    color: "white",
    fontWeight: 400,
    backgroundColor: "rgb(48, 63, 159)",
    borderRadius: 50,
    '&:hover': {
    color: "rgb(48, 63, 159)",
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: "50px",
    },
  }
}));
