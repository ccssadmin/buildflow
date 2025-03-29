import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ProjectWise from "./ProjectWise";
import DepartmentWise from "./DepartmentWise";
import CashflowForecast from "./CashflowForecast";
import VarianceView from "./VarianceView";
import CashflowTable from "./CashflowTable";

const FinanceCashFlow = () => {
    const [activeTab, setActiveTab] = useState("Summary");
    const [extraRows, setExtraRows] = useState([]);
    const [sortBy, setSortBy] = useState("Default");

    // Sample cashflow data for the chart
    const cashflowData = [
        { month: "Jan", inflow: 8, outflow: 15 },
        { month: "Feb", inflow: 25, outflow: 18 },
        { month: "Mar", inflow: 17, outflow: 10 },
        { month: "Apr", inflow: 9, outflow: 22 },
        { month: "May", inflow: 18, outflow: 11 },
        { month: "Jun", inflow: 10, outflow: 17 },
        { month: "Jul", inflow: 0, outflow: 0 }, // Future months with no data
        { month: "Aug", inflow: 0, outflow: 0 },
        { month: "Sep", inflow: 0, outflow: 0 },
        { month: "Oct", inflow: 0, outflow: 0 },
        { month: "Nov", inflow: 0, outflow: 0 },
        { month: "Dec", inflow: 0, outflow: 0 }
    ];

    // Load saved rows from localStorage on mount
    useEffect(() => {
        const savedRows = JSON.parse(localStorage.getItem("extraRows")) || [];
        setExtraRows(savedRows);
    }, []);

    // Save rows to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("extraRows", JSON.stringify(extraRows));
    }, [extraRows]);

    const addRow = () => {
        setExtraRows([...extraRows, { widget: "", description: "", amount: "" }]);
    };

    const handleRowChange = (index, field, value) => {
        const updatedRows = [...extraRows];
        updatedRows[index][field] = value;
        setExtraRows(updatedRows);
    };

    const tabs = [
        "Summary",
        "Project-wise",
        "Department-wise",
        "Cashflow Forecast",
        "Variance View",
        "Cashflow Table"
    ];

    return (
        <main className="page-finance-index page-ceo-finance">
            <style>
                {`
          /* Overall Layout */
          .page-finance-index {
            padding: 20px;
            background-color: #f8f9fa;
            min-height: 100vh;
          }
          
          /* Header and Sort Area */
          .header-container {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 15px;
          }
          
        /* Tabs Styling */
       .tabs-container {
    display: flex;
    margin-bottom: 5px; /* Reduced space between tabs */
    border-bottom: 1px solid #dee2e6;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}

.tabs-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}

.nav-tabs-container {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
}

.nav-item {
    margin-bottom: -1px;
}

.nav-link {
    cursor: pointer;
    padding: 8px 12px; /* Adjusted padding for reduced spacing */
    margin-right: 0; /* Removed right margin */
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    background-color: transparent;
    color: #6c757d;
    font-weight: 500;
    white-space: nowrap;
}

.nav-link.active {
    color: #ff5722;
    border-bottom: 2px solid #ff5722;
    background-color: transparent;
    font-weight: 600;
}

          
          /* Sort By Button */
          .sort-by-btn {
            background-color: #e9ecef;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            font-weight: 500;
            display: flex;
            align-items: center;
            color: #495057;
            margin-left: auto;
          }
          
          .sort-by-btn i {
            margin-left: 8px;
          }
          
          /* Cards & Tables */
          .card {
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            margin-bottom: 20px;
            background-color: white;
            border: 1px solid #eaeaea;
          }
          
          .card-title {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 16px;
            color: #333;
          }
          
          table.summary-table {
            width: 100%;
            border-collapse: collapse;
          }
          
          table.summary-table th,
          table.summary-table td {
            padding: 12px 15px;
            border: 1px solid #e9ecef;
          }
          
          table.summary-table th {
            background-color: #f8f9fa;
            font-weight: 500;
            color: #495057;
          }
          
          table.summary-table td {
            color: #6c757d;
          }
          
          .card-row {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 20px;
          }
          
          .card-col {
            flex: 1;
            min-width: 300px;
          }
          
          /* Chart Container */
          .chart-container {
            height: 300px;
            padding: 10px;
          }
          
          /* Add Column Button */
          .add-column-btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
          }
          
          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .card-row {
              flex-direction: column;
            }
          }
        `}
            </style>

            <div className="left-container left-container-100">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        {/* Sort By Button - Positioned Above Tabs */}
                        <div className="header-container">
                            <button className="sort-by-btn" onClick={() => setSortBy(sortBy === "Default" ? "Amount" : "Default")}>
                                Sort By <i className="fas fa-chevron-down"></i>
                            </button>
                        </div>

                        {/* Tabs in a Single Line with Horizontal Scroll */}
                        <div className="tabs-container">
                            <ul className="nav-tabs-container">
                                {tabs.map((tab) => (
                                    <li className="nav-item" key={tab}>
                                        <button
                                            className={`nav-link ${activeTab === tab ? "active" : ""}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Conditional Content */}
                        <div className="content-container">
                            {activeTab === "Summary" && (
                                <>
                                    <div className="card-row">
                                        {/* Left Card - Financial Summary Table */}
                                        <div className="card-col">
                                            <div className="card">
                                                <div className="card-body p-0">
                                                    <table className="summary-table" >
                                                        <thead >
                                                            <tr>
                                                                <th style={{backgroundColor:'#EBEBEB'}}>Card</th>
                                                                <th style={{backgroundColor:'#EBEBEB'}}>Description & Value</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Total Inflow (MTD)</td>
                                                                <td>₹85 Cr</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total Outflow (MTD)</td>
                                                                <td>₹85 Cr</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Net Cashflow (MTD)</td>
                                                                <td>-₹7 Cr (Deficit)</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Forecast Next 3 Months</td>
                                                                <td>₹30 Cr Shortfall Expected</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Delayed Receivables</td>
                                                                <td>₹18 Cr Pending &gt; 45 Days</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Bank Balance (Current)</td>
                                                                <td>₹125 Cr</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Card - Cashflow Chart */}
                                        <div className="card-col">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Cashflow</h5>
                                                    <div className="chart-container">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <LineChart
                                                                data={cashflowData}
                                                                margin={{
                                                                    top: 5,
                                                                    right: 30,
                                                                    left: 20,
                                                                    bottom: 5,
                                                                }}
                                                            >
                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                <XAxis dataKey="month" />
                                                                <YAxis label={{ value: 'Cr', angle: -90, position: 'insideLeft' }} />
                                                                <Tooltip />
                                                                <Legend />
                                                                <Line
                                                                    type="monotone"
                                                                    dataKey="inflow"
                                                                    stroke="#2196F3"
                                                                    activeDot={{ r: 8 }}
                                                                    strokeWidth={2}
                                                                />
                                                                <Line
                                                                    type="monotone"
                                                                    dataKey="outflow"
                                                                    stroke="#FF9800"
                                                                    strokeWidth={2}
                                                                />
                                                            </LineChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                        

                            {/* Project-wise Tab */}
                            {activeTab === "Project-wise" && (

                                <ProjectWise />

                            )}

                            {/* Department-wise Tab */}
                            {activeTab === "Department-wise" && (
                                <div className="card">
                                    <div className="card-body">
                                        <DepartmentWise />
                                    </div>
                                </div>
                            )}

                            {/* Cashflow Forecast Tab */}
                            {activeTab === "Cashflow Forecast" && (
                                <div className="card">
                                    <div className="card-body">
                                        <CashflowForecast />
                                    </div>
                                </div>
                            )}

                            {/* Variance View Tab */}
                            {activeTab === "Variance View" && (
                                <div className="card">
                                    <div className="card-body">
                                        <VarianceView />
                                    </div>
                                </div>
                            )}

                            {/* Cashflow Table Tab */}
                            {activeTab === "Cashflow Table" && (
                                <div className="card">
                                    <div className="card-body">
                                        <CashflowTable />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default FinanceCashFlow;