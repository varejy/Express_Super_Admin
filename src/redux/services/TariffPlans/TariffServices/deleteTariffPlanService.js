/* eslint-disable prettier/prettier */
import request from "superagent";
import base from "../../base";

import getAllTariffPlanServices from "./getAllTariffPlanServices";

import domain from "../../domain/domain";

import { store } from "../../../store";

export default function deleteTariffPlanService(id) {
    const { token } = store.getState().initial;
    return (dispatch) =>
        base(
            request
                .delete(`${domain}/tariffPlanServices/${id}/delete`)
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
