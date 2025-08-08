import initialConstants from "../../constants/initial.constants";

const deleteOneServiceAction = (payload) => ({
  type: initialConstants.taxiServices.delete,
  payload,
});

export default deleteOneServiceAction;
