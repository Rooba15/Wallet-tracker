export const listAction = (list = []) => {
  return {
    type: "LIST",
    payload: list
  };
};

export const calculateTotal = (val = 0) => {
  return (dispatch, getState) => {
    const { list } = getState();
    dispatch({
      type: "TOTAL",
      payload: list
    });
  };
};
