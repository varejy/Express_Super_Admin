import editOneServiceAction from "../../actions/TaxiServices/editService";

export default function editOneService(service) {
  return (dispatch) => dispatch(editOneServiceAction(service));
}
