import React from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/main">
              <Main />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
