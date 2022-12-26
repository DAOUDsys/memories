import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
    overflow: "hidden",
    "& .MuiButtonBase-root": {
      marginTop: theme.spacing(1),
    },
  },
  buttonSubmit: {
    marginBottom: 10,
    color: "white",
    fontWeight: 400,
    backgroundColor: "rgb(48, 63, 159)",
    borderRadius: 50,
    '&:hover': {
    color: "rgb(48, 63, 159)",
    }
  },
  buttonClear: {
    color: "white",
    fontWeight: 400,
    backgroundColor: "rgb(255, 22, 126)",
    borderRadius: 50,
    
    '&:hover': {
    color: "rgb(255, 22, 126)",
    }
  },
}));
