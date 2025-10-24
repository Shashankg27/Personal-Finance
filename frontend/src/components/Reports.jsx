import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "./partials/SideBar";
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

//   const [user, setUser] = useState(null);
let user = null;

//   useEffect(() => {
const token = getCookie("token");
console.log(token);
if (token) {
  const userData = jwtDecode(token);
  // setUser(userData);
  console.log(userData);
  user = userData;
}
console.log(user);
//   }, []);

const Reports = () => {
  const [downloading, setDownloading] = useState(false);
  const [reportType, setReportType] = useState('summary');
  const [timePeriod, setTimePeriod] = useState('current-month');
  const [fromDate, setFromDate] = useState('2024-01-01');
  const [toDate, setToDate] = useState('2024-12-31');

  const handleGenerate = async (type = 'pdf', quickPeriod = null) => {
    try {
      setDownloading(true);
      const jwt = getCookie("token");
      
      // Determine the period for quick reports
      let period = quickPeriod || timePeriod;
      let startDate = fromDate;
      let endDate = toDate;
      
      if (quickPeriod) {
        const now = new Date();
        switch (quickPeriod) {
          case 'this-month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
            break;
          case 'last-3-months':
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1).toISOString().split('T')[0];
            endDate = now.toISOString().split('T')[0];
            break;
          case 'this-year':
            startDate = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];
            endDate = now.toISOString().split('T')[0];
            break;
          case 'full-account':
            startDate = '2020-01-01';
            endDate = now.toISOString().split('T')[0];
            break;
        }
      }

      const params = new URLSearchParams({
        reportType: reportType,
        timePeriod: period,
        fromDate: startDate,
        toDate: endDate
      });

      const endpoint = type === 'csv' ? '/user/report/csv' : '/user/report';
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}${endpoint}?${params}`,
        {
          responseType: type === 'csv' ? 'text' : 'blob',
          withCredentials: true,
          headers: {
            Accept: type === 'csv' ? 'text/csv' : 'application/pdf',
            ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
          },
        }
      );

      if (type === 'csv') {
        // Handle CSV download
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `finance-report-${Date.now()}.csv`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        // Handle PDF download
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.download = `finance-report-${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
      alert("Could not generate the report. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleQuickReport = (period) => {
    handleGenerate('pdf', period);
  };

  const handleCsvExport = () => {
    handleGenerate('csv');
  };

  const handlePdfExport = () => {
    handleGenerate('pdf');
  };

  return (
    <div className="flex">
      <div>
        <SideBar focus="Reports" />
      </div>
      <div className="flex-1">
        <div className="bg-[#0f172a] min-h-screen text-white">
          {/* Header */}
          <div className="bg-[#1e293b] flex justify-between items-center px-4 py-3 mb-6 border !border-gray-700">
            <h3 className="text-2xl font-semibold">Reports & Export</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={handleGenerate}
                disabled={downloading}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white px-4 py-2 !rounded-md !no-underline"
              >
                <i className="fas fa-chart-bar p-1" />
                {downloading ? "Generating..." : "Generate Report"}
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm">{user?.name}</span>
              </div>
            </div>
          </div>

          {/* Cards section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-4">
                Reports Generated
                <i className="fas fa-file-alt" style={{ color: "#5ea8ff" }} />
              </h4>
              <p className="text-4xl font-bold text-[#5ea8ff] mt-3">47</p>
              <p className="text-sm text-gray-400">This year</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-4">
                Last Export
                <i
                  className="fas fa-download"
                  style={{ color: "#34d399", fontSize: 20 }}
                />
              </h4>
              <p className="text-2xl font-bold text-[#34d399] mt-3">Dec 15</p>
              <p className="text-sm text-gray-400">Monthly summary</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-4">
                Data Size
                <i
                  className="fas fa-database"
                  style={{ color: "#c084fc", fontSize: 20 }}
                ></i>
              </h4>
              <p className="text-4xl font-bold text-[#c084fc] mt-4">2.4GB</p>
              <p className="text-sm text-gray-400">Total Data</p>
            </div>

            <div className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-xl text-white font-semibold flex items-center gap-4">
                Storage Used
                <i
                  className="fas fa-cloud"
                  style={{ color: "#fbc400", fontSize: 20 }}
                ></i>
              </h4>
              <p className="text-4xl font-bold text-[#fbc400] mt-3">68%</p>
              <p className="text-sm text-gray-400">Of 5GB Limit</p>
            </div>
          </div>

          <div className="p-3 flex gap-4 w-full">
            <div className="flex flex-col gap-4 w-[70%]">
              <div className="bg-[#1e293b] p-6 rounded-lg">
                <p className="text-xl font-bold mb-6">Generate New Report</p>

                {/* Report Type and Time Period */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-2">Report Type</label>
                    <select
                      name="reportType"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="summary">Account Summary</option>
                      <option value="income">Income</option>
                      <option value="expenses">Expenses</option>
                      <option value="investments">Investments</option>
                      <option value="goals">Goals</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Time Period</label>
                    <select
                      name="timePeriod"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="current-month">Current Month</option>
                      <option value="last-month">Last Month</option>
                      <option value="last-3-months">Last 3 Months</option>
                      <option value="this-year">This Year</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                </div>

                {/* From Date and To Date */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-2">From Date</label>
                    <input
                      type="date"
                      name="fromDate"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">To Date</label>
                    <input
                      type="date"
                      name="toDate"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-4 py-2 bg-[#334155] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Categories (Optional) */}
                <div className="mb-6">
                  <label className="block text-sm mb-3">Categories (Optional)</label>
                  <div className="flex items-center gap-8">
                    <label className="flex items-center gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        name="income"
                        defaultChecked
                        className="w-4 h-4 text-blue-500 bg-[#334155] border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">Income</span>
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        name="expenses"
                        defaultChecked
                        className="w-4 h-4 text-blue-500 bg-[#334155] border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">Expenses</span>
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        name="investments"
                        className="w-4 h-4 text-blue-500 bg-[#334155] border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">Investments</span>
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        name="goals"
                        className="w-4 h-4 text-blue-500 bg-[#334155] border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">Goals</span>
                    </label>
                  </div>
                </div>

                {/* Export Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={handleCsvExport}
                    disabled={downloading}
                    className="bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-60 text-white px-6 py-3 rounded font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-file-csv"></i>
                    {downloading ? "Generating..." : "Export as CSV"}
                  </button>

                  <button 
                    onClick={handlePdfExport}
                    disabled={downloading}
                    className="bg-[#ef4444] hover:bg-[#dc2626] disabled:opacity-60 text-white px-6 py-3 rounded font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-file-pdf"></i>
                    {downloading ? "Generating..." : "Export as PDF"}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="w-[30%] flex flex-col gap-4">
              <div className="bg-[#1e293b] p-4 rounded-lg">
                <p className="text-xl font-bold mb-4">Quick Reports</p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => handleQuickReport('this-month')}
                    disabled={downloading}
                    className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-60 text-white px-4 py-2 rounded transition-colors flex items-center justify-center gap-3"
                  >
                    <i className="fas fa-circle-notch" aria-hidden="true"></i>
                    <span>This Month</span>
                  </button>
                  <button 
                    onClick={() => handleQuickReport('last-3-months')}
                    disabled={downloading}
                    className="w-full bg-[#06b6d4] hover:bg-[#0891b2] disabled:opacity-60 text-white px-4 py-2 rounded transition-colors flex items-center justify-center gap-3"
                  >
                    <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                    <span>Last 3 Months</span>
                  </button>
                  <button 
                    onClick={() => handleQuickReport('this-year')}
                    disabled={downloading}
                    className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:opacity-60 text-white px-4 py-2 rounded transition-colors flex items-center justify-center gap-3"
                  >
                    <i className="fas fa-circle-notch" aria-hidden="true"></i>
                    <span>This Year</span>
                  </button>
                  <button 
                    onClick={() => handleQuickReport('full-account')}
                    disabled={downloading}
                    className="w-full bg-[#f97316] hover:bg-[#ea580c] disabled:opacity-60 text-white px-4 py-2 rounded transition-colors flex items-center justify-center gap-3"
                  >
                    <i className="fas fa-chart-pie" aria-hidden="true"></i>
                    <span>Full Account</span>
                  </button>
                </div>
              </div>
            </div>
            {/* END RIGHT SIDEBAR */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
