import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProduct, delProduct, updateProduct } from 'store/actions/sellerAction'
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
import NumberFormat from 'react-number-format';
import { v4 as uuid } from 'uuid';

import ModalProduct from '../modal/ModalProduct';

import { ALERT_TYPE } from "./../../../utils/constants";
const { SUCCESS } = ALERT_TYPE;

const TableProductComponent = ({ sellers, addProduct, delProduct, updateProduct }) => {
  const { id } = useParams();
  const history = useHistory();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snakbarDesc, setSnackbarDesc] = useState({});
  const skeletonArray = Array(5).fill('');


  const [showTable, setShowTable] = useState((id) ? true : false );
  useEffect(() => {
    if(id && !showTable) {
      setShowTable(true);
    }
  }, [id, showTable])

  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    const getDataProducts = () => {
      setTimeout(()=>{
        const data = sellers.filter((seller) => seller.seller_code === id);
        if(_.isEmpty(data)) return history.push('/admin/sellers');
        setProductsData(data[0].products);
        setLoading(false);
      },1000)
    }

    if(loading && id){
      setLoading(true);
      getDataProducts();
    }
  }, [sellers, loading, id])

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  setTimeout(() => {
    setLoading(false);
  }, 1000)
  
  const handleDelete = (sellerCode, productID) => {
    confirmAlert({
      title: 'Delete data',
      message: 'Are you sure to delete this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setLoading(true);
            let payload = {
              seller_code: sellerCode,
              product_id: productID
            };
            delProduct(payload);
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

  // Modal Product

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  }
  const [loadingSubmitProduct, setLoadingSubmitProduct] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalIsAdd, setModalIsAdd] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleSubmit = (values) => {
    setLoadingSubmitProduct(true);
    const products = {
      id: (values.productId) ? values.productId : uuid(),
      name: values.productName,
      price: values.price,
      stock: values.stock,
      productImageUrl: 'https://via.placeholder.com/150',
    }
    if(values.productId){
      updateProduct({ seller_code: id ,products: products});
    }else{
      addProduct({ seller_code: id ,products: products});
    }
    setTimeout(() => {
      setModalOpen(false);
      setLoadingSubmitProduct(false);
      setLoading(true);
      handleSnackbar(SUCCESS, (values.productId) ? 'Update data successfully 😄' : 'Add data successfully 😄')
    }, 1000);
  }

  const handleShowModal = (productId = null) => {
    if(productId) {
      setModalTitle('Edit Product');
      setModalIsAdd(false);
      const indexProduct = productsData.findIndex((product) => product.id === productId);
      const selectProduct = productsData[indexProduct];
      setSelectedProduct(selectProduct);
    }else{
      setModalTitle('Add Product');
      setModalIsAdd(true);
      const products = {};
      setSelectedProduct(products);
    }
    setModalOpen(true);
  }

  return (
    <Row>
      {showTable &&
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
        <ModalProduct 
          modalOpen={modalOpen} 
          toogleModal={handleModalOpen}
          loadingSubmitProduct={loadingSubmitProduct}
          handleSubmitProduct={handleSubmit}
          title={modalTitle}
          isAdd={modalIsAdd}
          products={selectedProduct}
        />
          <Card className="shadow">
            <CardHeader className="border-0">
              <div className="d-flex justify-content-between">
                  <h3 className="mb-0">Products</h3>
                  <Button className="btn-icon btn-2" color="success" type="button" onClick={() => handleShowModal()}>
                    <span className="btn-inner--icon">
                      <i className="ni ni-fat-add"></i> Add Product
                    </span>
                  </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: '30%'}}>
                      Product Name
                    </TableCell>
                    <TableCell sx={{ width: '20%'}}>
                      Price
                    </TableCell>
                    <TableCell sx={{ width: '20%'}}>
                      Stock
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
                        <TableCell>
                          <Skeleton/>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                  {!loading && productsData.slice(0, limit).map((product,i) => (
                    <TableRow
                      hover
                      key={product.id}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Avatar
                            src={product.productImageUrl}
                            sx={{ mr: 2 }}
                          >
                          </Avatar>
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            {product.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <NumberFormat
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          displayType={"text"}
                          prefix={"Rp"}
                          value={product.price === "" ? "-" : product.price}
                          allowNegative={false}
                        />
                      </TableCell>
                      <TableCell>
                        {`${product.stock}`}
                      </TableCell>
                      <TableCell align='right'>
                        <Button color='primary' onClick={() => handleShowModal(product.id)}>Edit</Button>
                        <Button color='danger' onClick={() => handleDelete(id, product.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!loading && _.isEmpty(productsData)) &&
                    <TableRow
                      hover
                      key={0}
                    >
                      <TableCell colSpan={4} align={'center'}>
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
                count={productsData.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </CardFooter>
          </Card>
        </Col>
      }
    </Row>
  )
}

const mapStateToProps = state => ({
  sellers: state.sellerReducer.sellers
})

export default connect(mapStateToProps, {addProduct, delProduct, updateProduct})(TableProductComponent);