import getAllTariffPlansAction from "../../../actions/TariffPlans/TariffPlanServices/getAllTariffPlanServices";
import domain from "../../domain/domain";

import fetcher from "../../../../utils/fetcher";

import { store } from "../../../store";

export default function getAllTariffPlanServices() {
  const { token } = store.getState().initial;
  return (dispatch) =>
    fetcher(`${domain}/tariffPlanServices/list`, "GET", {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((payload) => {
        dispatch(getAllTariffPlansAction(payload.data.items));
        return payload;
      })
      .catch((error) => error);
}
