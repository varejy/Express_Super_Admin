import initialConstants from "../../constants/initial.constants";

const setTaxiServices = (payload) => ({
  type: initialConstants.companies.add,
  payload,
});

export default setTaxiServices;
