import initialConstants from "../../constants/initial.constants";

const deleteOneServiceAction = (payload) => ({
  type: initialConstants.companies.delete,
  payload,
});

export default deleteOneServiceAction;
