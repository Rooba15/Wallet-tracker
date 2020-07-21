import React from "react";
import IncomeForm from "./Components/IncomeForm";
import "./styles.css";

const App = () => {
  return (
    <div className="app-container">
      <h1>Wallet Tracker</h1>
      <IncomeForm />
    </div>
  );
};

export default App;
