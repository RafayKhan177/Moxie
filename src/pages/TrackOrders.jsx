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
    <div>
      {/* <Card sx={{ display: "flex", margin: "1rem", padding: "1rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {myOrders.displayName || "user has no name"}'s Details
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Email: {myOrders.userEmail || "user has no email"}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <span>
              Total Payment: <h5>{myOrders.total}</h5>
            </span>
            <span>Status: {myOrders.status || "status not found"}</span>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{
            width: "16rem",
            height: "16rem",
            objectFit: "cover",
            marginLeft: "auto",
            borderRadius: "50%",
          }}
          image={myOrders.photoURL}
          alt="profile"
        />
      </Card> */}
      {/* <h3 style={{ padding: "1rem" }}>Delivery Items</h3> */}
      <Table striped bordered hover>
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
