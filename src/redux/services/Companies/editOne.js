import editOneServiceAction from "../../actions/Companies/editService";

export default function editOneService(service) {
  return (dispatch) => dispatch(editOneServiceAction(service));
}
