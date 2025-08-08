import getAllTariffPlansAction from "../../actions/TariffPlans/getAllTariffPlans";
import domain from "../domain/domain";

import fetcher from "../../../utils/fetcher";

import { store } from "../../store";

export default function getAllTariffPlans() {
  const { token } = store.getState().initial;
  return (dispatch) =>
    fetcher(`${domain}/tariffPlans/list`, "GET", {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((payload) => {
        dispatch(getAllTariffPlansAction(payload.data.items));
        return payload.data.items;
      })
      .catch((error) => error);
}
