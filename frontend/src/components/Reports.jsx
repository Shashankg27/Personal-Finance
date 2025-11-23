import React, { useState, useEffect } from "react";
import SideBar from "./partials/SideBar";
import axios from "axios";
import Logout from "./partials/Logout";

const Reports = () => {
  const [user, setUser] = useState(null);
  const [reportType, setReportType] = useState('summary');
  const [timePeriod, setTimePeriod] = useState('current-month');
  const [fromDate, setFromDate] = useState('2020-01-01');
  const [toDate, setToDate] = useState('2034-12-31');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/data/user`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

  const handleGenerate = async (type = 'pdf', quickPeriod = null, useFilters = false) => {
    try {
      setDownloading(true);
      
      let period, startDate, endDate, reportTypeToUse;
      
      if (useFilters) {
        // Use current filter settings
        period = timePeriod;
        startDate = fromDate;
        endDate = toDate;
        reportTypeToUse = reportType;
      } else if (quickPeriod) {
        // Quick report with specific period
        period = quickPeriod;
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
        reportTypeToUse = 'summary'; // Quick reports are always summary
      } else {
        // Full report (no filters)
        period = 'full-account';
        startDate = '2020-01-01';
        endDate = new Date().toISOString().split('T')[0];
        reportTypeToUse = 'summary';
      }

      const params = new URLSearchParams({
        reportType: reportTypeToUse,
        timePeriod: period,
        fromDate: startDate,
        toDate: endDate
      });

      console.log('Report generation params:', {
        type,
        reportType: reportTypeToUse,
        timePeriod: period,
        fromDate: startDate,
        toDate: endDate,
        useFilters
      });

      const endpoint = type === 'csv' ? '/user/report/csv' : '/user/report';
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}${endpoint}?${params}`,
        {
          responseType: type === 'csv' ? 'text' : 'blob',
          withCredentials: true,
          headers: {
            Accept: type === 'csv' ? 'text/csv' : 'application/pdf',
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
    console.log('Generating filtered CSV report...');
    handleGenerate('csv', null, true); // Use filters
  };

  const handlePdfExport = () => {
    console.log('Generating filtered PDF report...');
    handleGenerate('pdf', null, true); // Use filters
  };

  const handleFullReport = () => {
    console.log('Generating full report...');
    handleGenerate('pdf', null, false); // Full report, no filters
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
                onClick={handleFullReport}
                disabled={downloading}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white px-4 py-2 !rounded-md !no-underline"
              >
                <i className="fas fa-chart-bar p-1" />
                {downloading ? "Generating..." : "Generate Full Report"}
              </button>
              <div className="flex items-center gap-2">
                <Logout />
              </div>
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

                {/* From Date and To Date - Only show when custom is selected */}
                {timePeriod === 'custom' && (
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
                )}

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
