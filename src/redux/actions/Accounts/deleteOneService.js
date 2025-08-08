import initialConstants from "../../constants/initial.constants";

const deleteOneServiceAction = (payload) => ({
  type: initialConstants.accounts.delete,
  payload,
});

export default deleteOneServiceAction;
