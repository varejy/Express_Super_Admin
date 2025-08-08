import request from "superagent";
import base from "../base";

import { store } from "../../store";

import domain from "../domain/domain";
import setActiveAccount from "../../actions/Accounts/setActiveAccount";
import getAllAccounts from "./getAllAccounts";

export default function deleteAccount(id) {
  const { token } = store.getState().initial;
  return (dispatch) =>
    base(
      request
        .delete(`${domain}/superAccounts/${id}/delete`)
        .set("Authorization", `Bearer ${token}`)
    )
      .then((payload) => {
        dispatch(setActiveAccount(null));
        dispatch(getAllAccounts());
        return payload;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
}
