import { useDispatch } from "react-redux";
import React from "react";

const actionCatcher = (action) => (dispatch) =>
  new Promise(async (resolve) => {
    await action()(dispatch);
    resolve();
  });

const LazyDispatchActions =
  (...actions) =>
  (Child) =>
  () => {
    const dispatch = useDispatch();
    actions.forEach((item) => actionCatcher(item)(dispatch));

    return <Child />;
  };
export default LazyDispatchActions;
