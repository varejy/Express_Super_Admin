import request from "superagent";
import base from "../base";

import getAllAccounts from "./getAllAccounts";

import { store } from "../../store";

import domain from "../domain/domain";

export default function addNewAccount(value) {
  const { token } = store.getState().initial;
  return (dispatch) =>
    base(
      request
        .post(`${domain}/superAccounts/create`)
        .set("authorization", `Bearer ${token}`)
        .send(value)
    )
      .then((payload) => {
        dispatch(getAllAccounts(payload));
        return payload;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
}
