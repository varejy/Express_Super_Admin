/* eslint-disable prettier/prettier */
import request from "superagent";
import base from "../../base";

import getAllTariffPlanServices from "./getAllTariffPlanServices";

import domain from "../../domain/domain";

import { store } from "../../../store";

export default function addTariffPlanService(service) {
    const { token } = store.getState().initial;
    return (dispatch) =>
        base(
            request
                .post(`${domain}/tariffPlanServices/create`)
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
