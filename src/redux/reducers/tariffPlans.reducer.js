/* eslint-disable prettier/prettier */
import initialConstants from "../constants/initial.constants";

const initialState = {
    tariffPlans: [],
    filteredTariffPlans: [],
    serviceToEdit: {},
    tariffPlanServices: []
};
export default function initialReducer(state = initialState, action) {
    switch (action.type) {
        case initialConstants.tariffPlans.add:
            return {
                ...state,
                filteredTariffPlans: [...state.tariffPlans, action.payload],
                tariffPlans: [...state.tariffPlans, action.payload],
            };
        case initialConstants.tariffPlans.delete:
            return {
                ...state,
                filteredTariffPlans: state.tariffPlans.filter(
                    (item) => item._id !== action.payload
                ),
                tariffPlans: state.tariffPlans.filter(
                    (item) => item._id !== action.payload
                ),
            };
        case initialConstants.tariffPlans.search:
            return {
                ...state,
                filteredTariffPlans: state.tariffPlans
                    .map((item) => item.title.includes(action.payload) && item)
                    .filter((item) => item !== false),
            };

        case initialConstants.tariffPlans.edit:
            return {
                ...state,
                serviceToEdit: action.payload,
                tariffPlans: [
                    ...state.tariffPlans.filter(
                        (item) => item._id !== action.payload._id
                    ),
                    action.payload,
                ],
                filteredTariffPlans: [
                    ...state.tariffPlans.filter(
                        (item) => item._id !== action.payload._id
                    ),
                    action.payload,
                ],
            };
        case initialConstants.tariffPlans.all:
            return {
                ...state,
                tariffPlans: action.payload,
            };
        case initialConstants.tariffPlanServices.all:
            return {
                ...state,
                tariffPlanServices: action.payload,
            };
        case initialConstants.tariffPlanServices.add:
            return {
                ...state,
                tariffPlanServices: [...state.tariffPlans, action.payload],
            };
        default:
            return state;
    }
}
