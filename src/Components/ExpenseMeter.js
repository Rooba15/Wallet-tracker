import React, { useState } from "react";
import { useSelector } from "react-redux";

const ExpenseMeter = () => {
  var expenseCount;
  const list = useSelector(state => (state.list ? state.list : []));

  const expenseList = list.filter(item => {
    return item.type === "expense";
  });

  if (expenseList.length > 3) {
    expenseCount = 3;
  } else {
    expenseCount = expenseList.length;
  }
  const mostExpenditure = expenseList
    .sort((a, b) => (a.amount > b.amount ? 1 : -1))
    .slice(-expenseCount);

  const income = list.reduce((res, item) => {
    return item.type !== "expense" ? res + +item.amount : res;
  }, 0);

  return (
    <div className="progress-container">
      <div className={mostExpenditure.length === 0 ? "toggle-display" : ""}>
        <h3>Where are you spending much?</h3>
        <br />
        {mostExpenditure && mostExpenditure.length > 0 ? (
          mostExpenditure.map((item, index) => {
            var per = Math.floor((item.amount / income) * 100) + "%";

            return (
              <div key={index}>
                <span>{item.description}</span>
                <div className="ui small progress" key={index}>
                  <div
                    className={["bar", "bar" + index].join(" ")}
                    style={{ width: per }}
                  >
                    <div className="progress">{per}</div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-muted">You have'nt spent anything so far :)</div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ExpenseMeter);
