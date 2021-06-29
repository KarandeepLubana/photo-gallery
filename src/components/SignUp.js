import React from "react";
import { auth } from "../firebase/config";
import { Avatar, Grid, Paper, TextField, Button } from "@material-ui/core";

const SignUp = () => {
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.elements[0];
    const password = e.target.elements[1];

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      );
      console.log("User:", user);
    } catch (error) {
      alert("error");
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <Grid>
        <Paper elevation={10} style={paperStyle} className="login">
          <Grid align="center">
            <Avatar style={avatarStyle}>{/* <LockIcon /> */}</Avatar>
            <h2>Sign Up</h2>
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
            Sign Up
          </Button>
        </Paper>
      </Grid>
    </form>
  );
};

export default SignUp;
