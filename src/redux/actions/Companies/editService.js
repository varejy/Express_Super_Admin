import initialConstants from "../../constants/initial.constants";

const editOneServiceAction = (payload) => ({
  type: initialConstants.companies.edit,
  payload,
});

export default editOneServiceAction;
