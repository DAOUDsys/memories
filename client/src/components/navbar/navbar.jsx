import React, { useState, useEffect } from "react";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyle from "./navbar.style.js";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { authActionTypes } from "../../constants/action_types";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Navbar() {
  const styles = useStyle();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    setUser(null);
    navigate("/");
    dispatch({ type: authActionTypes.LOGOUT });
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={styles.appBar} position="static" color="inherit">
        <Link to="/" className={styles.brandContainer}>
        <img
          
          className={styles.image}
          src={memoriesText}
          alt="memories text"
          height="45px"
        />
        <img
          className={styles.image}
          src={memoriesLogo}
          alt="memories logo"
          height="45px"
        />
        </Link>
      <Toolbar className={styles.toolbar}>
        {user ? (
          <div className={styles.profile}>
            <Avatar
              className={styles.purple}
              alt={user?.result.name}
              src={user?.result.image}
            >
              {user.result?.name[0]}
            </Avatar>
            <Typography className={styles.userName} variant="h6">
              {user.result?.name}
            </Typography>
            <Button
              variant="outlined"
              className={styles.logout}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            className={styles.button}
            component={Link}
            to="/auth"
            variant="outlined"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
