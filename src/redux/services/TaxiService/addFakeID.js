import request from "superagent";
import base from "../base";

import { store } from "../../store";

import getAllFakeIDs from "./getAllFakeIDs";

import domain from "../domain/domain";

export default function authenticate(newID) {
  const { token } = store.getState().initial;
  return (dispatch) =>
    base(
      request
        .post(`${domain}/reservedIds/create`)
        .set("Authorization", `Bearer ${token}`)
        .send(newID)
    )
      .then((payload) => {
        dispatch(getAllFakeIDs());
        return payload;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
}
