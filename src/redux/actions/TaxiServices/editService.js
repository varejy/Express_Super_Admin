import initialConstants from "../../constants/initial.constants";

const editOneServiceAction = (payload) => ({
  type: initialConstants.taxiServices.edit,
  payload,
});

export default editOneServiceAction;
