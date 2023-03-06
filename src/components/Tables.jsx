import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useFirebase } from "../context/firebase";

const columns = [
  { field: "name", headerName: "Name", width: 130 },
  { field: "category", headerName: "Category", width: 130 },
  { field: "price", headerName: "Price", width: 130 },
  { field: "desc", headerName: "Discription", width: 150 },
  { field: "id", headerName: "ID", width: 150 },
];

const DataTable = () => {
  const items = useSelector((state) => state);
  const displayItems = items.displayItems[0];
  // console.log(displayItems);

  const firebase = useFirebase();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleSelectionChange = (selection) => {
    setSelectedItems(selection.selectionModel);
    console.log("selected items:", selection.selectionModel);
  };

  const handleDeleteClick = async () => {
    setIsLoading(true);
    console.log("Deleting items:", selectedItems);
    const deletePromises = selectedItems.map((itemId) =>
      firebase.deleteItemData(itemId)
    );
    await Promise.all(deletePromises);
    setIsLoading(false);
  };

  return (
    <div style={{ height: "100vh", width: "100%", borderRadius: "3px" }}>
      {displayItems && displayItems.length > 0 && (
        <>
          <DataGrid
            rows={displayItems}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={handleSelectionChange}
            selectionModel={selectedItems}
          />

          <button
            onClick={handleDeleteClick}
            disabled={selectedItems.length === 0 || isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Selected Items"}
          </button>
        </>
      )}
    </div>
  );
};

export default DataTable;
