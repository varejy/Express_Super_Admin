import domain from "../domain/domain";

import getAllFakeIDs from "../../actions/TaxiServices/getAllFakeIDs";

import fetcher from "../../../utils/fetcher";

import { store } from "../../store";

export default function authenticate() {
  const { token } = store.getState().initial;
  return (dispatch) =>
    fetcher(`${domain}/reservedIds/list`, "GET", {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((payload) => {
        dispatch(getAllFakeIDs(payload));
        return payload;
      })
      .catch((error) => error);
}
