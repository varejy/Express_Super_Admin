import React from "react";
import { Redirect, Route } from "react-router-dom";
import { store } from "../redux/store";

export default function PrivateRouteComponent({
  component: Component,
  ...rest
}) {
  const { token } = store.getState().initial;

  const setRender = (props) => {
    if (token) {
      return <>{Component && <Component {...props} />}</>;
    }
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location },
        }}
      />
    );
  };
  return <Route {...rest} render={(props) => setRender(props)} />;
}
