import request from "superagent";
import setActiveAccount from "../../actions/Accounts/setActiveAccount";
import base from "../base";

import { store } from "../../store";

import domain from "../domain/domain";

export default function getOneAccount(id) {
  const { token } = store.getState().initial;
  return (dispatch) =>
    base(
      request
        .get(`${domain}/superAccounts/${id}/get`)
        .set("Authorization", `Bearer ${token}`)
    )
      .then((payload) => dispatch(setActiveAccount(payload.data.item)))
      .catch((error) => {
        console.log(error);
        return error;
      });
}
