import React, { useState } from "react";
import { Tables } from "../components/Index";
import CreateItems from "../components/CreateItems";

const Dashboard = () => {
  const [selectedButton, setSelectedButton] = useState("allItems");
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  let content;
  if (selectedButton === "allItems") {
    content = <Tables />;
  } else if (selectedButton === "addItems") {
    content = <CreateItems />;
  }

  return (
    <section className="dashboard_section">
      <div className="side_nav">
        <button onClick={() => handleButtonClick("allItems")}>All Data</button>
        <button onClick={() => handleButtonClick("addItems")}>Add Items</button>
      </div>
      <div className="content">{content}</div>
    </section>
  );
};

export default Dashboard;
