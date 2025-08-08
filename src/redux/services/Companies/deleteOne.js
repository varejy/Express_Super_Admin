import deleteOneServiceAction from "../../actions/TaxiServices/deleteOneService";

export default function deleteOneService(id) {
  return (dispatch) => dispatch(deleteOneServiceAction(id));
}
