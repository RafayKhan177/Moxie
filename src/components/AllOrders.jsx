import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useFirebase } from "../context/firebase";
import { margin, width } from "@mui/system";

const Tables = () => {
  const firebase = useFirebase();
  const [selectedItem, setSelectedItem] = useState(null);

  const allOrders = useSelector((state) => state.allOrders.orders);

  return selectedItem ? (
    <div>
      <Card sx={{ display: "flex", margin: "1rem", padding: "1rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {selectedItem.displayName || "user has no name"}'s Details
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Email: {selectedItem.userEmail || "user has no email"}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <span>
              Total Payment: <h5>{selectedItem.total}</h5>
            </span>
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
          image={selectedItem.photoURL}
          alt="profile"
        />
      </Card>
      <h3 style={{ padding: "1rem" }}>Delivery Items</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Product</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedItem.items.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt="product" />
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button className="btn btn-button" onClick={() => setSelectedItem(null)}>
        Back to Orders
      </button>
    </div>
  ) : (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Email</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {allOrders &&
          allOrders.map((item) => (
            <tr
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedItem(item)}
            >
              <td>
                <img src={item.photoURL} alt="user profile" />
              </td>
              <td>{item.displayName}</td>
              <td>{item.userEmail || "user has no email"}</td>
              <td>{item.total}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default Tables;
