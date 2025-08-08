import request from "superagent";
import base from "../../base";
import domain from "../../domain/domain";
import getAllTariffPlanServices from "./getAllTariffPlanServices";

import { store } from "../../../store";

export default function editTariffPlanService(id, service) {
  const { token } = store.getState().initial;
  return (dispatch) =>
    base(
      request
        .put(`${domain}/tariffPlanServices/${id}/put`)
        .set("Authorization", `Bearer ${token}`)
        .send(service)
    )
      .then((payload) => {
        dispatch(getAllTariffPlanServices());
        return payload;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
}
