import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "../context/firebase";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button, ButtonGroup } from "@mui/material";

const Tables = () => {
  const firebase = useFirebase();
  const [selectedItem, setSelectedItem] = useState(null);

  const allOrders = useSelector((state) => state.allOrders.orders);

  const orderStateHandle = (state) => {
    firebase.orderState(selectedItem.orderId, state);
  };

  return selectedItem ? (
    <Box sx={{ padding: "1rem 0" }}>
      <Card sx={{ display: "flex", margin: "1rem", padding: "1rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h5" component="div">
              {selectedItem.displayName || "user has no name"}'s Details
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Email: {selectedItem.userEmail || "user has no email"}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <span>
              Total Payment: <Typography variant="h5" component="h5">{selectedItem.total}</Typography>
            </span>
            <span>Status: {selectedItem.status || "status not found"}</span>
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
      <Typography variant="h3" component="h3" sx={{ padding: "1rem" }}>
        Delivery Items
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} striped bordered hover>
          <TableHead>
            <TableRow>
              <TableCell>Picture</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedItem.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img src={item.image} alt="product" />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="buttons" style={{ margin: "0 1rem" }}>
        <p>Order Status: {selectedItem.items.status}</p>
        <div style={{ gap: "5px" }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={() => orderStateHandle("Order out of Delivery")}>Delivery</Button>
            <Button onClick={() => orderStateHandle("Panding")}>Panding</Button>
            <Button onClick={() => orderStateHandle("Your Order is Preparing")}>Preparing</Button>
          </ButtonGroup>
        </div>
        <br />
        <div style={{ gap: "5px" }}>
          <Button className="mx-1" variant="contained" color="success" onClick={() => orderStateHandle("Approve")}>
            Approve
          </Button>
          <Button className="mx-1" variant="contained" color="error" onClick={() => orderStateHandle("Cancel")}>
            Cancel
          </Button>
          <Button className="mx-1" variant="outlined" onClick={() => setSelectedItem(null)}>
            Back to Orders
          </Button>
        </div>
      </div>
    </Box>
  ) : (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} striped bordered hover>
        <TableHead>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders &&
            allOrders.map((item) => (
              <TableRow
                key={item.id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedItem(item)}
              >
                <TableCell>
                  <img src={item.photoURL} alt="user profile" />
                </TableCell>
                <TableCell>{item.displayName}</TableCell>
                <TableCell>{item.userEmail || "user has no email"}</TableCell>
                <TableCell>{item.total}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
