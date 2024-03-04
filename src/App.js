import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "./index.css";
import bg from "./bg.svg";

import excelData from "./leaderboard.xlsx";

const Leaderboard = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const readExcel = async () => {
      const response = await fetch(excelData);
      const dataBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(dataBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const teams = jsonData.slice(1).map((row, index) => ({
        id: index + 1,
        name: row[0],
        points: parseInt(row[1], 10),
      }));

      setTeamData(teams);
    };
    readExcel();

    return () => {};
  }, []);

  const sortedTeams = [...teamData].sort((a, b) => b.points - a.points);

  return (
    <div
      className="bg-cover bg-center min-h-screen w-full p-4 py-12 flex justify-center items-center bg-repeat"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "repeat", // Add this line for background repeat
      }}
    >
      <div className="bg-primary rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-semibold mb-4 text-white text-center">
          Points Table
        </h1>
        <table className="w-full border-collapse border border-gray-800 mt-4 bg-white rounded-lg shadow-lg mx-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-r">Rank</th>
              <th className="py-2 px-4 border-r">Team Name</th>
              <th className="py-2 px-4">Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr key={team.id} className="border-t">
                <td className="py-2 px-4 border-r text-gray-800 font-semibold">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-r text-gray-800 font-semibold">
                  {team.name}
                </td>
                <td className="py-2 px-4 text-gray-800 font-semibold">
                  {team.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;




