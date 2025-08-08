import searchService from "../../actions/Companies/searchService";

export default function search(text) {
  return (dispatch) => dispatch(searchService(text));
}
