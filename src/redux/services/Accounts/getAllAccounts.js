import getAllAccountsAction from "../../actions/Accounts/getAllAccounts";
import domain from "../domain/domain";

import { store } from "../../store";

import fetcher from "../../../utils/fetcher";

export default function getAllAccounts() {
  const { token } = store.getState().initial;
  return (dispatch) =>
    fetcher(`${domain}/superAccounts/list`, "GET", {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((payload) => {
        dispatch(getAllAccountsAction(payload.data.items));
        return payload.data.items;
      })
      .catch((error) => error);
}
