import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../store/appContext";

const withAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const { isAuthenticated } = useContext(Context);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/login" />;
    }
  };
};

export default withAuth;
