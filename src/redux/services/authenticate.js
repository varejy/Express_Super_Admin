import setAuthorizationLoading from "../actions/session.setAuthorizationLoading";
import fetcher from "../../utils/fetcher";
import domain from "./domain/domain";

import { store } from "../store";

export default function refreshToken() {
  const { token } = store.getState().initial;
  return (dispatch) =>
    fetcher(`${domain}/auth`, "GET", {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((payload) => {
        dispatch(setAuthorizationLoading(false));
        return payload;
      })
      .catch((error) => {
        dispatch(setAuthorizationLoading("error"));
        return error;
      });
}
