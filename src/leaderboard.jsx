// src/components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('your-excel-file.xlsx');
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          setData(jsonData);
          console.log('Data loaded successfully:', jsonData);
        };

        reader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
      <table className="min-w-full border border-collapse border-gray-800">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-800">Team Name</th>
            <th className="py-2 px-4 border-b border-gray-800">Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-800">{entry.teamName}</td>
              <td className="py-2 px-4 border-b border-gray-800">{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
