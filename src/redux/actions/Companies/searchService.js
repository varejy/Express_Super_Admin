import initialConstants from "../../constants/initial.constants";

const searchService = (payload) => ({
  type: initialConstants.companies.search,
  payload,
});

export default searchService;
