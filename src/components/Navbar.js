import React from "react";
import { auth } from "../firebase/config";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

const Navbar = () => {
  const history = useHistory();

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  return (
    <nav className="nav-bar">
      <h1>Phogo Gallery</h1>
      <Button color="primary" onClick={handleLogout}>Log Out</Button>
    </nav>
  );
};

export default Navbar;