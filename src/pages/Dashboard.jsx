import React, { useState } from "react";
import { Tables, AllOrders } from "../components/Index";
import CreateItems from "../components/CreateItems";

import { useFirebase } from "../context/firebase";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const firebase = useFirebase();
  const [selectedButton, setSelectedButton] = useState("allItems");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  let content;
  if (selectedButton === "allItems") {
    content = <Tables />;
  } else if (selectedButton === "addItems") {
    content = <CreateItems />;
  } else if (selectedButton === "AllOrders") {
    content = <AllOrders />;
  }

  // if (firebase.user.email !== "admin@gmail.com") {
  //   return <NotAuthorized />;
  // }

  return (
    <>
      <section className="dashboard_section">
        <Box sx={{ width: "100%", margin: "2rem 1rem" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab
              onClick={() => handleButtonClick("allItems")}
              value="one"
              label="ALL ITEMS"
              wrapped
            />
            <Tab
              onClick={() => handleButtonClick("addItems")}
              value="two"
              label="ADD ITEMS"
            />
            <Tab
              onClick={() => handleButtonClick("AllOrders")}
              value="three"
              label="ORDERS"
            />
          </Tabs>
        </Box>
        <div className="content">{content}</div>
      </section>
    </>
  );
};

const NotAuthorized = () => {
  return (
    <div>
      <h1>You are not authorized to view this page.</h1>
    </div>
  );
};

export default Dashboard;
