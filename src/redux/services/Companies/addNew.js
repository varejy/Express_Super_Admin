import setTaxiServices from "../../actions/Companies/setServices";

export default function addNewTaxiService(value) {
  return (dispatch) => dispatch(setTaxiServices(value));
}
