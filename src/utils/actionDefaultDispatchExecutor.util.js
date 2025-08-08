import actionDefaultExecutor from "./actionDefaultExecutor.util";

export default function actionDefaultDispatchExecutor(
  loaderState,
  execute,
  onSuccess,
  onError
) {
  return async (dispatch) =>
    actionDefaultExecutor(dispatch, loaderState, execute, onSuccess, onError);
}
