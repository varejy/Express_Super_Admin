import setIsLoading from "./setIsLoading.util";

const responseExecutor = async (r, ...functionData) => {
  if (typeof r === "function")
    return responseExecutor(await r(...functionData), ...functionData);
  return r;
};
export default async function actionDefaultExecutor(
  dispatch,
  loaderState,
  execute,
  onSuccess,
  onError
) {
  let loaderName = loaderState;
  let loaderPosition = true;
  let offLoadAfterComplete = true;
  if (typeof loaderState === "object") {
    loaderName = loaderState.name;
    offLoadAfterComplete = loaderState.offLoadAfterComplete;
    loaderPosition = !loaderState.invert;
  }
  dispatch(setIsLoading(loaderName, loaderPosition));
  try {
    const response = await responseExecutor(execute, dispatch);
    await responseExecutor(onSuccess, response, dispatch);
    if (loaderState && offLoadAfterComplete)
      dispatch(setIsLoading(loaderName, !loaderPosition));
  } catch (e) {
    responseExecutor(onError, e, dispatch);
    if (loaderState) dispatch(setIsLoading(loaderName, !loaderPosition));
  }
}

// export const deleteDepartment = (departmentArray) =>
//   actionDefaultDispatchExecutor(
//     departmentSettingsSealSet.data.isLoading,
//     async () => {
//       const { token, companyID } = store.getState().initialReducer;
//       // eslint-disable-next-line new-cap
//       await Promise.all(
//         departmentArray.map((department) =>
//           fetcher(
//             `${baseHost}/api/company/${companyID}/department/${department.original.id}/delete`,
//             "DELETE",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           )
//         )
//       );
//     },
//     async (response, dispatch) => {
//       await getDepartmentTableData()(dispatch);
//     },
//     (e) => {
//       console.error(e);
//       snackbar().enqueueSnackbar(e.message, {
//         variant: "error",
//         anchorOrigin: {
//           vertical: "bottom",
//           horizontal: "right",
//         },
//       });
//     }
//   );
