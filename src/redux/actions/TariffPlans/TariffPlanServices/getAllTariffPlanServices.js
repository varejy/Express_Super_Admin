import initialConstants from "../../../constants/initial.constants";

const AllTariffPlansAction = (payload) => ({
  type: initialConstants.tariffPlanServices.all,
  payload,
});

export default AllTariffPlansAction;
