import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useFirebase } from "../context/firebase";
import { MdOutlineDeleteSweep } from "react-icons/md";

const TrackOrders = () => {
  const items = useSelector((state) => state);
  const myOrders = items.myOrders[0];

  const firebase = useFirebase();

  return (
    <div className="track-order">
        <h3>ORDER'S DETAILS</h3>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Picture</th>
            {/* <th>Name</th> */}
            <th>Date</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  style={{
                    height: "5rem",
                    width: "5rem",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  src={item.photoURL}
                  alt="product"
                />
              </td>
              {/* <td>{item.name}</td> */}
              <td>{item.Date}</td>
              <td>{item.total}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TrackOrders;
