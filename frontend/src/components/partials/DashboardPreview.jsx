import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, CartesianGrid, BarChart, Bar, XAxis, YAxis, ResponsiveContainer} from 'recharts';

const data = [
  { name: 'Food', value: 400 },
  { name: 'Transportation', value: 300 },
  { name: 'Entertainment', value: 300 },
  { name: 'Utilities', value: 200 },
  { name: 'Shopping', value: 250 },
];
const dataBar = [
  { name: 'Mon', expenses: 120 },
  { name: 'Tue', expenses: 180 },
  { name: 'Wed', expenses: 290 },
  { name: 'Thu', expenses: 490 },
  { name: 'Fri', expenses: 180 },
  { name: 'Sat', expenses: 290 },
  { name: 'Sun', expenses: 450 }
];


const COLORS = ['#EF5350', '#FB8C00', '#FBC02D', '#4CAF50', '#42A5F5'];

const DashboardPreview = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-10">
      <p className="font-bold text-4xl text-center p-6">Dashboard Preview</p>
      <div className="bg-[#1a2332] p-8 rounded-2xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-5">
          <div className="bg-green-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
            <div>
              <p className="text-sm">This Month's Income</p>
              <p className="text-2xl font-bold">$5,240</p>
            </div>
            <i className="fas fa-arrow-up text-2xl"></i>
          </div>

          <div className="bg-red-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
            <div>
              <p className="text-sm">This Month's Expenses</p>
              <p className="text-2xl font-bold">$3,180</p>
            </div>
            <i className="fas fa-arrow-down text-2xl"></i>
          </div>

          <div className="bg-blue-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
            <div>
              <p className="text-sm">Balance Left</p>
              <p className="text-2xl font-bold">$2,060</p>
            </div>
            <i className="fas fa-wallet text-2xl"></i>
          </div>

          <div className="bg-purple-600 p-6 rounded-xl shadow text-white flex justify-between items-center">
            <div>
              <p className="text-sm">Active Goals</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <i className="fas fa-spinner fa-spin text-2xl"></i>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#374151] p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Expense Categories</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="top"
                    align="center"
                    iconType="square"
                    wrapperStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#374151] p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Weekly Expenses</h3>
            <div style={{ width: '100%', height: 400, backgroundColor: '#374151', padding: '1rem', borderRadius: '10px' }}>
              <ResponsiveContainer>
                <BarChart data={dataBar}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#445" />
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend
                    wrapperStyle={{ color: '#fff' }}
                    iconType="plainline"
                  />
                  <Bar dataKey="expenses" fill="#42A5F5" name="Daily Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
