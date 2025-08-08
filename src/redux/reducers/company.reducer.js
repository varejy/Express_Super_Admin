import initialConstants from "../constants/initial.constants";

const initialState = {
  companies: [],
  filteredCompanies: [],
  serviceToEdit: {},
};
export default function initialReducer(state = initialState, action) {
  switch (action.type) {
    case initialConstants.companies.add:
      return {
        ...state,
        filteredCompanies: [...state.companies, action.payload],
        companies: [...state.companies, action.payload],
      };
    case initialConstants.companies.delete:
      return {
        ...state,
        filteredCompanies: state.companies.filter(
          (item) => item._id !== action.payload
        ),
        companies: state.companies.filter(
          (item) => item._id !== action.payload
        ),
      };
    case initialConstants.companies.search:
      return {
        ...state,
        filteredCompanies: state.companies
          .map((item) => item.title.includes(action.payload) && item)
          .filter((item) => item !== false),
      };
    case initialConstants.companies.edit:
      return {
        ...state,
        serviceToEdit: action.payload,
        companies: [
          ...state.companies.filter((item) => item._id !== action.payload._id),
          action.payload,
        ],
        filteredCompanies: [
          ...state.companies.filter((item) => item._id !== action.payload._id),
          action.payload,
        ],
      };
    default:
      return state;
  }
}
