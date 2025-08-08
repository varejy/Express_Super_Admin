import initialConstants from "../../constants/initial.constants";

const searchService = (payload) => ({
  type: initialConstants.accounts.search,
  payload,
});

export default searchService;
