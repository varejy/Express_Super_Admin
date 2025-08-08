import initialConstants from "../../constants/initial.constants";

const AllTariffPlansAction = (payload) => ({
  type: initialConstants.tariffPlans.all,
  payload,
});

export default AllTariffPlansAction;
