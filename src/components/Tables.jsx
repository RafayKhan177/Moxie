import React from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useFirebase } from "../context/firebase";
import { MdOutlineDeleteSweep } from "react-icons/md";

import "bootstrap/dist/css/bootstrap.min.css";
// import '.../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Tables = () => {
  const items = useSelector((state) => state);
  const displayItems = items.displayItems[0];

  const firebase = useFirebase();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

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
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Description</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {displayItems &&
          displayItems.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <img src={item.itemPhoto} alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.desc}</td>
                <td onClick={() => handleDeleteConfirm(item)}>
                  <MdOutlineDeleteSweep className="delete_icon"/>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default Tables;
