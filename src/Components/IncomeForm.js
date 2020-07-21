import React from "react";
import List from "./List";
import { connect } from "react-redux";

import { listAction, calculateTotal } from "./Action";
import BalanceCard from "./BalanceCard";
import ExpenseChart from "./ExpenseChart";
import ExpenseMeter from "./ExpenseMeter";

//Component to add income/expense
class IncomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      isValid: true,
      fields: {
        id: "",
        description: "",
        date: "",
        type: "Income",
        amount: ""
      }
    };
    this.chosenRecord = {};
    this.incomeList = [];
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [name]: value
      }
    }));
  };

  //reset after submit
  reset = () => {
    let fields = {
      description: "",
      date: "",
      amount: "",
      type: "Income",
      id: Math.floor(Math.random() * 100)
    };
    this.setState({ fields, edit: false });
  };

  //Modify changes
  edit = id => {
    this.chosenRecord = this.incomeList.filter(item => item.id === id)[0];
    let record = this.chosenRecord;
    let fields = {
      id: record.id,
      description: record.description,
      date: record.date,
      amount: record.amount,
      type: record.type
    };

    this.setState({ edit: true, fields });
  };

  //Update the existing record
  update = event => {
    event.preventDefault();
    let prevList = this.incomeList;
    prevList.forEach((item, index, self) => {
      if (item.id === this.chosenRecord.id) {
        self[index] = this.state.fields;
      }
    });
    this.incomeList = prevList;
    this.props.updateList(this.incomeList);
    this.props.calculateTotal();
    this.reset();
    // this.setState({ incomeList: prevList }, () => {
    //   this.reset();
    //   this.props.updateList(this.state.incomeList);
    // });
  };

  //Submit the changes
  save = event => {
    event.preventDefault();
    if (this.state.fields.amount) {
      if (
        this.state.fields.type !== "Income" &&
        this.props.total < this.state.fields.amount
      ) {
        alert("No balance");
      } else {
        this.incomeList.push(this.state.fields);
        this.props.updateList(this.incomeList);
        this.props.calculateTotal();
        this.setState({ isValid: true });
        this.reset();
      }
    } else {
      this.setState({ isValid: false });
    }
  };

  componentDidMount() {
    // if there is any value available in the prop
    var random = Math.floor(Math.random() * 1000);
    this.setState(prevState => ({
      fields: {
        ...prevState.fields, //retain other fields
        id: random // update the ID
      }
    }));
    this.incomeList = [...this.props.list];
  }

  render() {
    const { description, date, type, amount } = this.state.fields;
    const { edit, isValid } = this.state;
    return (
      <>
        <ExpenseMeter />
        <div className="form-container">
          <form>
            <div className="ui form">
              <div className="field">
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Eg: Salary/EMI/Shopping/Medical"
                  value={description}
                  onChange={this.handleChange}
                  maxLength={20}
                  autoComplete="off"
                />
              </div>
              <div className="field">
                <label>Date</label>
                <input
                  type="date"
                  placeholder="Select Date"
                  name="date"
                  value={date}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label>Income / Expense</label>
                <select name="type" value={type} onChange={this.handleChange}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="field">
                <label>Amount:</label>
                <div className={isValid ? "" : "ui input error"}>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Type amount.."
                    value={amount}
                    maxLength={10}
                    onChange={event => {
                      this.setState({ isValid: true });
                      this.handleChange(event);
                    }}
                  />
                </div>
              </div>
              {edit ? (
                <button
                  className="ui primary button"
                  type="submit"
                  value="Update"
                  onClick={this.update}
                >
                  Update
                </button>
              ) : (
                <input
                  className="ui primary button"
                  type="submit"
                  value="Save"
                  disabled={!date || !description || !amount}
                  onClick={this.save}
                />
              )}
            </div>
          </form>
          <br />
          <p>
            <i>All fields are mandatory</i>
          </p>
        </div>
        <BalanceCard />
        <br />
        <List edit={this.edit} />
        {this.props.list && this.props.list.length > 0 && <ExpenseChart />}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    list: state.list ? state.list : [],
    total: state.total ? state.total : 0
  };
};

const mapPropsToDispatch = dispatch => {
  return {
    updateList: list => {
      dispatch(listAction(list));
    },
    calculateTotal: () => {
      dispatch(calculateTotal());
    }
  };
};
export default connect(
  mapStateToProps,
  mapPropsToDispatch
)(IncomeForm);
