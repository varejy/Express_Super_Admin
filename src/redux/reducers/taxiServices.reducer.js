import initialConstants from "../constants/initial.constants";

const initialState = {
  taxiServices: [],
  fakeIDs: {
    data: { items: [] },
  },
  filteredServices: [],
  serviceToEdit: {},
};
export default function initialReducer(state = initialState, action) {
  switch (action.type) {
    case initialConstants.taxiServices.add:
      return {
        ...state,
        filteredServices: [...state.taxiServices, action.payload],
        taxiServices: [...state.taxiServices, action.payload],
      };
    case initialConstants.taxiServices.delete:
      return {
        ...state,
        filteredServices: state.taxiServices.filter(
          (item) => item._id !== action.payload
        ),
        taxiServices: state.taxiServices.filter(
          (item) => item._id !== action.payload
        ),
      };
    case initialConstants.taxiServices.search:
      return {
        ...state,
        filteredServices: state.taxiServices
          .map((item) => item.title.includes(action.payload) && item)
          .filter((item) => item !== false),
      };
    case initialConstants.taxiServices.allIDs:
      return {
        ...state,
        fakeIDs: action.payload,
      };
    case initialConstants.taxiServices.edit:
      return {
        ...state,
        serviceToEdit: action.payload,
        taxiServices: [
          ...state.taxiServices.filter(
            (item) => item._id !== action.payload._id
          ),
          action.payload,
        ],
        filteredServices: [
          ...state.taxiServices.filter(
            (item) => item._id !== action.payload._id
          ),
          action.payload,
        ],
      };
    default:
      return state;
  }
}
