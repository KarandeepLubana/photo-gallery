import React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";
import { createUserDocument } from "../firebase/config";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState(null);

  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setuser(user);
      setLoading(false);

      if (user) {
        createUserDocument(user);
        history.push("/main");
      } else {
        history.push("/");

        return;
      }
    });
  }, [user, history]);

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
