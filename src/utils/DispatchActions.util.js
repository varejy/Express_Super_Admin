import { useDispatch } from "react-redux";
import React, { useState } from "react";

import { Dimmer, Loader } from "semantic-ui-react";

const actionCatcher = (action) => (dispatch) =>
  new Promise(async (resolve) => {
    await action()(dispatch);
    resolve();
  });

const DispatchActions =
  (...actions) =>
  (Child) =>
  () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const promises = [];
    actions.forEach((item) => {
      promises.push(actionCatcher(item)(dispatch));
    });
    Promise.all(promises).then(() => setTimeout(() => setLoaded(true), 12));
    if (!loaded) {
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }

    return <Child />;
  };
export default DispatchActions;
