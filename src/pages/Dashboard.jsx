import React, { useState } from "react";
import { Tables } from "../components/Index";

const Dashboard = () => {
  const [selectedButton, setSelectedButton] = useState("allItems");
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  let content;
  if (selectedButton === "allItems") {
    content = <Tables />;
  } else if (selectedButton === "soon") {
    content = <div>Coming Soon</div>;
  }

  return (
    <section className="dashboard_section">
      <div className="side_nav">
        <button onClick={() => handleButtonClick("allItems")}>All Data</button>
        <button onClick={() => handleButtonClick("soon")}>Soon</button>
      </div>
      <div className="content">{content}</div>
    </section>
  );
};

export default Dashboard;
