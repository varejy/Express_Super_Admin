/* eslint-disable prettier/prettier */
import request from "superagent";
import base from "../base";

import getAllTariffPlans from "./getAllTariffPlans";

import domain from "../domain/domain";

import { store } from "../../store";

export default function editTariffPlan(value) {
    const { token } = store.getState().initial;
    return (dispatch) =>
        base(
            request
                .put(`${domain}/tariffPlans/${value.id}/put`)
                .set("Authorization", `Bearer ${token}`)
                .send(value)
        )
            .then((payload) => {
                dispatch(getAllTariffPlans());
                return payload;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
}
