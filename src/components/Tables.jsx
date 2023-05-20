import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "../context/firebase";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { MdOutlineDeleteSweep } from "react-icons/md";

const Tables = () => {
  const items = useSelector((state) => state);
  const displayItems = items.displayItems[0];

  const firebase = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleDeleteClick = async () => {
    setIsLoading(true);
    console.log("Deleting items:", selectedItems);
    const deletePromises = selectedItems.map((itemId) =>
      firebase.deleteItemData(itemId)
    );
    await Promise.all(deletePromises);
    setIsLoading(false);
  };

  const handleDeleteConfirm = (item) => {
    setSelectedItems([item.id]);
    handleDeleteClick();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayItems &&
            displayItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img src={item.itemPhoto} alt="" />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.desc}</TableCell>
                <TableCell onClick={() => handleDeleteConfirm(item)}>
                  <MdOutlineDeleteSweep className="delete_icon" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
