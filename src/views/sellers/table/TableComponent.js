import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { delSeller } from 'store/actions/sellerAction'
// Material UI
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { Skeleton } from '@mui/material';
// Reacstrap UI
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Row,
  CardBody,
  Col,
} from "reactstrap";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import _ from "lodash";

import getInitials from "./../../../utils/get-initials";

import { ALERT_TYPE } from "./../../../utils/constants";

const { SUCCESS } = ALERT_TYPE;

const TableComponents = ({ sellers, delSeller }) => {
  const history = useHistory();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snakbarDesc, setSnackbarDesc] = useState({});
  const skeletonArray = Array(5).fill('');

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  setTimeout(() => {
    setLoading(false);
  }, 1000)

  const handleToForm = (sellerCode = null) => {
    let path = (sellerCode) ? `./sellers/form/${(sellerCode)}` : `./sellers/form`;
    history.push({
      pathname: path
    })
  }
  
  const handleDelete = (sellerCOde) => {
    confirmAlert({
      title: 'Delete data',
      message: 'Are you sure to delete this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setLoading(true);
            delSeller(sellerCOde);
            handleSnackbar(SUCCESS, 'Delete data successfully 😄')
            setTimeout(() => {
              setLoading(false);
            }, 1000)
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Click No')
        }
      ]
    })
  }

  const handleSnackbar = (type, message) => {
    setSnackbarOpen(true);
    setSnackbarDesc({
      type: type,
      message: message
    })
  }

  return (
    <Row>
      <Col>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => { setSnackbarOpen(false); }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snakbarDesc.type} sx={{ width: '100%' }}>
          {snakbarDesc.message}
        </Alert>
      </Snackbar>
        <Card className="shadow">
          <CardHeader className="border-0">
            <div className="d-flex justify-content-between">
                <h3 className="mb-0">Seller Management</h3>
                <Button className="btn-icon btn-2" color="success" type="button" onClick={() => handleToForm()}>
                  <span className="btn-inner--icon">
                    <i className="ni ni-fat-add"></i> Add Seller
                  </span>
                </Button>
            </div>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '30%'}}>
                    Name
                  </TableCell>
                  <TableCell sx={{ width: '40%'}}>
                    Address
                  </TableCell>
                  <TableCell sx={{ width: '30%'}} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading &&
                  skeletonArray.map((item, index) => (
                    <TableRow
                      hover
                      key={index}
                    >
                      <TableCell>
                        <Skeleton/>
                      </TableCell>
                      <TableCell>
                        <Skeleton/>
                      </TableCell>
                      <TableCell>
                        <Skeleton/>
                      </TableCell>
                    </TableRow>
                  ))
                }
                {!loading && sellers.slice(0, limit).map((seller) => (
                  <TableRow
                    hover
                    key={seller.seller_code}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar
                          src={seller.avatarUrl}
                          sx={{ mr: 2 }}
                        >
                          {getInitials(seller.seller_name)}
                        </Avatar>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {seller.seller_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {`${seller.address}`}
                    </TableCell>
                    <TableCell align='right'>
                      <Button color='primary' onClick={() => handleToForm(seller.seller_code)}>Edit</Button>
                      <Button color='danger' onClick={() => handleDelete(seller.seller_code)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && _.isEmpty(sellers) &&
                  <TableRow
                    hover
                    key={0}
                  >
                    <TableCell colSpan={3} align={'center'}>
                      No data available 😢
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </CardBody>
          <CardFooter>
            <TablePagination
              component="div"
              count={sellers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </CardFooter>
        </Card>
      </Col>
    </Row>
  )
}

const mapStateToProps = state => ({
  sellers: state.sellerReducer.sellers
})

export default connect(mapStateToProps, {delSeller})(TableComponents);