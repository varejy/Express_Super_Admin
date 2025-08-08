import request from "superagent";
import base from "./base";

import setAuthorizationLoading from "../actions/session.setAuthorizationLoading";

import domain from "./domain/domain";

export default function authenticate(credentials) {
  return (dispatch) =>
    base(request.post(`${domain}/auth`).send(credentials))
      .then((payload) => {
        dispatch(setAuthorizationLoading(payload.data.token));

        return payload;
      })
      .catch((error) => {
        dispatch(setAuthorizationLoading("error"));
      });
}
