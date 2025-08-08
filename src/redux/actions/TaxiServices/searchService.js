import initialConstants from "../../constants/initial.constants";

const searchService = (payload) => ({
  type: initialConstants.taxiServices.search,
  payload,
});

export default searchService;
