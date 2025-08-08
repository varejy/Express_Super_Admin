import initialConstants from "../../constants/initial.constants";

const AllServiceAction = (payload) => ({
  type: initialConstants.accounts.all,
  payload,
});

export default AllServiceAction;
