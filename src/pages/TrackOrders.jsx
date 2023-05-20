import React from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const TrackOrders = () => {
  const items = useSelector((state) => state);
  const myOrders = items.myOrders[0];

  return (
    <div className="track-order">
      <h3>ORDER'S DETAILS</h3>
      <TableContainer>
        <Table striped bordered hover>
          <TableHead>
            <TableRow>
              <TableCell>Picture</TableCell>
              {/* <TableCell>Name</TableCell> */}
              <TableCell>Date</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myOrders && myOrders.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
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
                </TableCell>
                {/* <TableCell>{item.name}</TableCell> */}
                <TableCell>{item.Date}</TableCell>
                <TableCell>{item.total}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TrackOrders;
