import initialConstants from "../../constants/initial.constants";

const setTaxiServices = (payload) => ({
  type: initialConstants.taxiServices.add,
  payload,
});

export default setTaxiServices;
