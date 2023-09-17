import React from "react";
import TableToPDF from "./TableTopdf";

const Email = () => {
  const tableData = [
    ["Donnée 1", "Donnée 2"],
    ["Donnée 3", "Donnée 4"],
    // ... autres données
  ];

  return (
    <div>
        <TableToPDF data={tableData} />
    </div>
  );
};

export default Email;
