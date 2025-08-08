import initialConstants from "../../constants/initial.constants";

const editOneServiceAction = (payload) => ({
  type: initialConstants.accounts.edit,
  payload,
});

export default editOneServiceAction;
