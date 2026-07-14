
import {  Grid, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Radio, RadioGroup, FormControlLabel,} from '@mui/material';
import axios from 'axios';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllOrders = () => {
  const navigate = useNavigate();

  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selOrdStatus, setSelOrdStatus] = useState("");

  // Fetch Orders
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        // const result = await axios.get(`http://localhost:5000/api/fetchallorders`);
        const result = await axios.get(`https://e-commerce-ewhg.onrender.com`);
        setAllOrders(result.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchAllOrders();
  }, []);

  // Open Dialog
  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    // setSelOrdStatus(order.orderStatus); 
    setIsOpen(true);
  };

  // Update Status
  const updateOrderStatus = async () => {
    if (!selOrdStatus) return alert("Please select a status");

    const reqBody = {
      _id: selectedOrder?._id,
      orderStatus: selOrdStatus,
    };

    try {
      // await axios.put("http://localhost:5000/api/updateorder", reqBody);
      await axios.put("https://e-commerce-ewhg.onrender.com", reqBody);
      alert("Order Status Updated");

      // Update UI without reload
      setAllOrders((prev) =>
        prev.map((ord) =>
          ord._id === selectedOrder._id
            ? { ...ord, orderStatus: selOrdStatus }
            : ord
        )
      );

      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Table Columns
  const columns = useMemo(() => [
    {
      accessorFn: (row) => `${row.userId.firstName} ${row.userId.lastName}`,
      header: "Customer Name",
    },
    {
      accessorKey: "userId.address.city",
      header: "City",
    },
    {
      accessorKey: "orderAmount",
      header: "Amount",
    },
    {
      accessorKey: "orderStatus",
      header: "Status",
    },
    {
      accessorKey: "userId.email",
      header: "Email",
    },
    {
      header: "Actions",
      Cell: ({ row }) => (
        <>
          <Button
            onClick={() =>
              navigate("/admin/ordersdetail", { state: row.original })
            }
            variant="contained"
            sx={{ mr: 1 }}
          >
            Details
            
          </Button>

          <Button
            variant="outlined"
            onClick={() => handleOpenDialog(row.original)}
          >
            Update
          </Button>
        </>
      ),
    },
  ], [navigate]);

  const table = useMaterialReactTable({
    columns,
    data: allOrders,
    enablePagination: true,
  });

  return (
    <>
      <Typography variant="h4" mb={2}>
        All Orders
      </Typography>

      <Box>
        <MaterialReactTable table={table} />
      </Box>

      {/* Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Update Status</DialogTitle>

        <DialogContent>
          <Typography mb={2}>
            Current Status: {selectedOrder?.orderStatus}
          </Typography>

          <RadioGroup
            value={selOrdStatus}
            onChange={(e) => setSelOrdStatus(e.target.value)}
          >
            {/* <FormControlLabel value="Pending" control={<Radio />} label="Pending" /> */}
            <FormControlLabel value="Approve" control={<Radio />} label="Approve" />
            <FormControlLabel value="Intransit" control={<Radio />} label="In Transit" />
            <FormControlLabel value="Delivered" control={<Radio />} label="Delivered" />
            <FormControlLabel value="Cancel" control={<Radio />} label="Cancel" />
          </RadioGroup>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={updateOrderStatus}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllOrders;
