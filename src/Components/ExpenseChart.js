import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

const ExpenseChart = () => {
  const list = useSelector(state => (state.list ? state.list : []));

  //const dateList = list.map(item => item.date);
  // const IncomeList = list.map(item => {
  //   return item.type === "Income" ? item.amount : 0;
  // });
  // const ExpenseList = list.map(item => {
  //   return item.type !== "Income" ? item.amount : [0];
  // });

  /* Using Memo for data update in Chart */
  const dateList = useMemo(() => list.map(item => item.date), [list]);

  const IncomeList = useMemo(
    () =>
      list.map(item => {
        return item.type === "Income" ? item.amount : 0;
      }),
    [list]
  );

  const ExpenseList = useMemo(
    () =>
      list.map(item => {
        return item.type !== "Income" ? item.amount : 0;
      }),
    [list]
  );

  const data = {
    labels: dateList,
    datasets: [
      {
        label: "Income",
        data: IncomeList,
        borderWidth: 1,
        backgroundColor: "#86cdf1"
      },
      {
        label: "Expense",
        data: ExpenseList,
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="chart-container">
      <Line data={data} />
    </div>
  );
};

export default ExpenseChart;
