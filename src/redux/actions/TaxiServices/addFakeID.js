import initialConstants from "../../constants/initial.constants";

const addFakeID = (payload) => ({
  type: initialConstants.taxiServices.addFakeID,
  payload,
});

export default addFakeID;
