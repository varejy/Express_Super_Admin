import setTaxiServices from "../../actions/TaxiServices/setServices";

export default function addNewTaxiService(value) {
  return (dispatch) => dispatch(setTaxiServices(value));
}
