import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthernticated, user } = useSelector(
    (state) => state.user
  );

  return (
    <Fragment>
      {loading === false && (
        <Routes
          {...rest}
          render={(props) => {
            if (isAuthernticated === false) {
              return <Navigate to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Navigate to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
