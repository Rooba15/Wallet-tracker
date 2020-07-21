import React from "react";
import { useSelector } from "react-redux";

const List = props => {
  const list = useSelector(state => state.list);
  return (
    <>
      <h3>History of Expense/Income</h3>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list ? (
            list.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description || "--"}</td>
                <td>{item.date || "--"}</td>
                <td>{item.type || "--"}</td>
                <td>{item.amount || "--"}</td>
                <td>
                  <button
                    className="ui primary button"
                    onClick={() => props.edit(item.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <i>No Record Available</i>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default List;
