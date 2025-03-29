import React from "react";


const BudgetScreen = () => {

 

  const budgetData = Array(15).fill({
    department: "Civil Engineer",
    fiscalYear: "2024-25",
    assigned: "₹25 Cr",
    utilized: "₹17.8 Cr",
    remaining: "₹7.2 Cr",
    variance: "+₹0.5 Cr",
  });

  

  return (
    <main className="page-finance-index">
    <div className="left-container left-container-100">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <table className="finance-table">
        <thead >
          <tr>
            <th>Departments</th>
            <th>Fiscal Year</th>
            <th>Assigned</th>
            <th>Utilized</th>
            <th>Remaining</th>
            <th>Variance</th>
          </tr>
        </thead>
        <tbody>
          {budgetData.map((row, index) => (
            <tr key={index}>
              <td>{row.department}</td>
              <td>{row.fiscalYear}</td>
              <td>{row.assigned}</td>
              <td>{row.utilized}</td>
              <td>{row.remaining}</td>
              <td>{row.variance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  </div>
      
    </main>
  );
};

export default BudgetScreen;
