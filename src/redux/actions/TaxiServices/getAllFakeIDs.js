import initialConstants from "../../constants/initial.constants";

const getAllFakeIDs = (payload) => ({
  type: initialConstants.taxiServices.allIDs,
  payload,
});

export default getAllFakeIDs;
