import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import React from "react";

const TakeParamFromPath =
  (type, param, convertToNumber = false) =>
  (ChildComponent) =>
  () => {
    const dispatch = useDispatch();
    const params = useParams();
    if (!params[param]) throw new Error(`This ID is not exist. (${param})`);
    dispatch({
      type,
      payload: convertToNumber ? +params[param] : params[param],
    });
    return <ChildComponent /> || <></>;
  };
export default TakeParamFromPath;
