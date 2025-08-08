import initialConstants from "../../constants/initial.constants";

const setTaxiServices = (payload) => ({
  type: initialConstants.accounts.add,
  payload,
});

export default setTaxiServices;
