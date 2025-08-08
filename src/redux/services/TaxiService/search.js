import searchService from "../../actions/TaxiServices/searchService";

export default function search(text) {
  return (dispatch) => dispatch(searchService(text));
}
