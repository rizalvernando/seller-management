import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addSeller, updateSeller } from "store/actions/sellerAction";
import { useHistory, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { 
  CircularProgress, 
  Skeleton, 
  Stack,
  Snackbar,
  Alert, 
} from '@mui/material';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  FormFeedback,
  UncontrolledAlert
} from "reactstrap";
import { v4 as uuid } from 'uuid';

import { ACTION, ALERT_TYPE } from "./../../../utils/constants";

const { INSERT, UPDATE } = ACTION;
const { SUCCESS, ERROR } = ALERT_TYPE;

const FormComponent = ({ sellers, addSeller, updateSeller }) => {
  const { id } = useParams();
  const history = useHistory();
  const [sellerCode, setSellerCode] = useState(id);
  const [loading, setLoading] = useState((sellerCode) ? true : false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snakbarDesc, setSnackbarDesc] = useState({});

  const [sellerData, setSellerData] = useState({});
  useEffect(() => {
    const getDataSeller = () => {
      setTimeout(()=>{
        const data = sellers.filter((seller) => seller.seller_code === sellerCode);
        if(_.isEmpty(data)) return history.push('/admin/sellers');
        setSellerData(data[0]);
        setLoading(false);
      },1000)
    }

    if(loading && sellerCode){
      setLoading(true);
      getDataSeller();
    }
  }, [sellers, loading, sellerCode, history])
  
  const handleSubmit = (values) => {
    setLoading(true);
    const data = {
      seller_code: (sellerCode) ? sellerCode : uuid(),
      seller_name: values.sellerName,
      address: values.sellerAddress,
      avatarUrl: 'https://via.placeholder.com/150',
      products: !_.isEmpty(sellerData.products) ? sellerData.products : [],
    }

    if(sellerCode){
      updateSeller(data);
    }else{
      addSeller(data);
      setTimeout(() => {
        handleToForm(data.seller_code);
      },1000)
    }
    setSellerCode(null);

    setSellerCode(data.seller_code);
    handleSnackbar(SUCCESS, (sellerCode) ? 'Update seller successfully 😄' : 'Add seller successfully 😄');
  }

  const handleToForm = (sellerCode = null) => {
    let path = (sellerCode) ? `./form/${(sellerCode)}` : `./form`;
    history.push({
      pathname: path
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
      <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
        {((_.isEmpty(sellerData) && (sellerCode)) || loading) &&
          <Stack spacing={1}>
            <div className="d-flex justify-content-center align-item-center mb--7 mt--5">              
              <Skeleton variant="circular" width={150} height={150}/>
            </div>
            <Skeleton variant="rectangular" width={'100%'} height={300} />
          </Stack>
        }
        {(!_.isEmpty(sellerData) && !loading) &&
          <Card className="card-profile shadow">
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={sellerData.avatarUrl}
                  />
                </div>
              </Col>
            </Row>
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
            </CardHeader>
            <CardBody className="pt-0 pt-md-4">
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span className="heading">{sellerData.products.length}</span>
                      <span className="description">Products</span>
                    </div>
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>
                  {sellerData.seller_name}
                </h3>
                <div className="h5 font-weight-300">
                  <i className="ni location_pin" />
                  {sellerData.address}
                </div>
              </div>
            </CardBody>
          </Card>
        }
      </Col>
      <Col className="order-xl-1" xl={(sellerCode) ? 8 : 12}>
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8 d-flex align-item-center">
                <h3 className="mb-0 mr-2">{(!sellerCode) && 'Add'} Seller Account</h3>
                {loading && <CircularProgress size={25} /> }
              </Col>
              <Col className="text-right" xs="4">
                <Button
                  color="warning"
                  onClick={(e) => history.push(('/admin/sellers'))}
                  size="md"
                >
                  <i className="fa fa-arrow-left"></i> Back
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{
                sellerName: !_.isEmpty(sellerData) ? sellerData.seller_name : '',
                sellerAddress: !_.isEmpty(sellerData) ? sellerData.address : '',
              }}
              enableReinitialize={true}
              validationSchema={
                Yup.object().shape({
                  sellerName: Yup
                    .string()
                    .max(100)
                    .required('Seller Name is required'),
                  sellerAddress: Yup
                    .string()
                    .max(255)
                    .required('Seller Address is required'),
                })
              }
              onSubmit={handleSubmit}
              >
              {({
                values,
                initialValues,
                errors,
                status,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                handleReset,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  {status && <UncontrolledAlert {...status} />}
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="seller-name"
                          >
                            Seller Name
                          </label>
                          <Input
                            className="form-control"
                            id="sellerName"
                            placeholder="Seller Name"
                            type="text"
                            value={values.sellerName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            readOnly={loading}
                            invalid={Boolean(touched.sellerName && errors.sellerName)}
                          />
                          <FormFeedback>{errors.sellerName}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="seller-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control"
                            id="sellerAddress"
                            placeholder="Address"
                            type="text"
                            value={values.sellerAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            readOnly={loading}
                            invalid={Boolean(touched.sellerAddress && errors.sellerAddress)}
                          />
                          <FormFeedback>{errors.sellerAddress}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button
                      type="submit"
                      color="primary"
                      size="md"
                      disabled={loading}
                    >
                      <i className="fa fa-save"></i> {(sellerCode) ? UPDATE : INSERT }
                    </Button>
                    <Button
                      type="button"
                      color="secondary"
                      size="md"
                      onClick={handleReset}
                      disabled={loading}
                    >
                      <i className="fa fa-undo"></i> Reset
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  sellers: state.sellerReducer.sellers
});

export default connect(mapStateToProps, {addSeller, updateSeller})(FormComponent);
