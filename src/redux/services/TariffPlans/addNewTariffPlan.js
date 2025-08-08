/* eslint-disable prettier/prettier */
import request from "superagent";
import base from "../base";

import getAllTariffPlans from "./getAllTariffPlans";

import domain from "../domain/domain";

import { store } from "../../store";

export default function addTariffPlan(tariff) {
    const { token } = store.getState().initial;
    return (dispatch) =>
        base(
            request
                .post(`${domain}/tariffPlans/create`)
                .set("Authorization", `Bearer ${token}`)
                .send(tariff)
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
