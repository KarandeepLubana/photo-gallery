import React from "react";
import { auth } from "../firebase/config";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 380,
    margin: "60px auto",
  };
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };

  const marginStyle = {
    margin: "20px auto",
  };

  const buttonStyle = {
    margin: "60px auto",
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.elements[0];
    const password = e.target.elements[1];

    if (email.value && password.value) {
      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Grid>
        <Paper elevation={10} style={paperStyle} className="login">
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockIcon />
            </Avatar>
            <h2>LogIn</h2>
          </Grid>
          <TextField
            id="email"
            label="Email"
            fullWidth
            required
            style={marginStyle}
            type="email"
            autoComplete="username"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            required
            name="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={buttonStyle}
          >
            LogIn
          </Button>

          <Typography>
            Don't you have an account ?<Link to="/SignUp">Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </form>
  );
};

export default Login;
