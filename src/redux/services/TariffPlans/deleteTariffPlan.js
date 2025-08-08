/* eslint-disable prettier/prettier */
import request from "superagent";
import base from "../base";

import getAllTariffPlanServices from "./getAllTariffPlans";

import domain from "../domain/domain";

import { store } from "../../store";

export default function deleteTariffPlan(id) {
    const { token } = store.getState().initial;
    return (dispatch) =>
        base(
            request
                .delete(`${domain}/tariffPlans/${id}/delete`)
                .set("Authorization", `Bearer ${token}`)
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
