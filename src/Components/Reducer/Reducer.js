const appReducer = (state = {}, action) => {
  if (action.type === "LIST") {
    return Object.assign({}, state, {
      list: [...action.payload]
    });
  } else if (action.type === "TOTAL") {
    const sum = action.payload.reduce(function(res, item) {
      return item.type === "Income" ? res + +item.amount : res - +item.amount;
    }, 0);
    return Object.assign({}, state, {
      total: sum
    });
  }
  return state;
};

export default appReducer;
