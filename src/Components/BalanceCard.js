import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

const BalanceCard = React.memo(props => {
  const { list, total } = useSelector(state => state);
  const [count, setCount] = useState(0);

  const expense = list
    ? list.reduce((res, item) => {
        return item.type === "expense" ? res + +item.amount : res;
      }, 0)
    : 0;
  const income = list
    ? list.reduce((res, item) => {
        return item.type !== "expense" ? res + +item.amount : res;
      }, 0)
    : 0;
  const mul = (a, b) => {
    return a * b;
  };

  const mem = useMemo(() => mul(2, count), [count]);
  const check = () => {
    setCount(count + 1);
    console.log(mem);
  };
  return (
    <div className="card-container">
      <div className="amt-card" onClick={check}>
        <h3>Amount in Wallet</h3>
        <h2>{total || 0}</h2>
      </div>
      <div className="amt-card income" onClick={check}>
        <h3>Total Earnings</h3>
        <h2>{income || 0}</h2>
      </div>
      <div className="amt-card expense" onClick={check}>
        <h3>Total Money spent</h3>
        <h2>{expense || 0}</h2>
      </div>
    </div>
  );
});

export default BalanceCard;
