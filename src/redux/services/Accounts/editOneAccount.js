import request from "superagent";
import base from "../base";

import { store } from "../../store";

import domain from "../domain/domain";
import setActiveAccount from "../../actions/Accounts/setActiveAccount";

export default function editOneAccount(value, superAccountId) {
  const { token } = store.getState().initial;
  return (dispatch) =>
    base(
      request
        .put(`${domain}/superAccounts/${superAccountId}/put`)
        .set("authorization", `Bearer ${token}`)
        .send(value)
    )
      .then((payload) => {
        dispatch(setActiveAccount(payload.data.item));
        return payload;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
}
