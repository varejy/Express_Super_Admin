import searchService from "../../actions/Accounts/searchService";

export default function search(text) {
  return (dispatch) => dispatch(searchService(text));
}
