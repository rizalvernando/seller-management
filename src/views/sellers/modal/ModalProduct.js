import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  FormFeedback,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col
} from "reactstrap";
import { 
  CircularProgress, 
  Skeleton, 
} from '@mui/material';
import { Formik } from "formik";
import * as Yup from "yup";
import NumberFormat from 'react-number-format';

const ModalProduct = (props) => {
  return (
    <>
      <Modal
          className="modal-dialog-centered"
          size="md"
          isOpen={props.modalOpen}
          toggle={props.toogleModal}
      >
          <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent">
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={props.toogleModal}
              >
                <span aria-hidden={true}>×</span>
              </button>
              <div className="text-muted mt-2 mb-2 d-flex justify-content-center align-item-center">
                  <h2 className='mr-2'>{props.title}</h2>
                  {props.loadingSubmitProduct && <CircularProgress size={25} /> }
              </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Formik
                  initialValues={{
                    productName: (props.products) ? props.products.name : null,
                    price: (props.products) ? props.products.price : null,
                    stock: (props.products) ? props.products.stock : null,
                    productId: (props.products) ? props.products.id : null,
                  }}
                  enableReinitialize={true}
                  validationSchema={
                    Yup.object().shape({
                      productName: Yup
                        .string()
                        .max(100)
                        .required('Product Name is required'),
                      price: Yup
                        .number()
                        .max(9999999999)
                        .required('Price is required'),
                      stock: Yup
                        .number()
                        .max(999)
                        .required('Stock is required'),
                    })
                  }
                  onSubmit={props.handleSubmitProduct}
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
                  setFieldValue,
                }) => (
                  <Form id="formProduct" onSubmit={handleSubmit}>
                      <FormGroup className={`${Boolean(touched.productName && errors.productName) ? 'mb-5 has-danger' : 'mb-2'}`}>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                  <i className="ni ni-single-copy-04" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                              className="form-control"
                              id="productName"
                              placeholder="Product Name"
                              type="text"
                              value={values.productName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={props.loadingSubmitProduct}
                              invalid={Boolean(touched.productName && errors.productName)}
                              
                            />
                            <FormFeedback tooltip>{errors.productName}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className={`${Boolean(touched.price && errors.price) ? 'mb-5 has-danger' : 'mb-2'}`}>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                  <i className="ni ni-money-coins" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <NumberFormat
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              prefix={'Rp'}
                              allowNegative={false}
                              className={`form-control ${Boolean(touched.price && errors.price) && 'is-invalid'}`}
                              id="price"
                              placeholder="Price"
                              type="text"
                              value={values.price}
                              onBlur={handleBlur}
                              readOnly={props.loadingSubmitProduct}
                              onValueChange={({floatValue}) => {
                                setFieldValue('price', floatValue)
                              }}
                            />
                            <FormFeedback tooltip>{errors.price}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className={`${Boolean(touched.stock && errors.stock) ? 'mb-5 has-danger' : 'mb-2'}`}>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                  <i className="ni ni-box-2" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                              className="form-control"
                              id="stock"
                              placeholder="Stock"
                              type="number"
                              value={values.stock}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={props.loadingSubmitProduct}
                              invalid={Boolean(touched.stock && errors.stock)}
                            />
                            <FormFeedback tooltip>{errors.stock}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                            disabled={props.loadingSubmitProduct}
                        >
                          <i className='fa fa-save'></i> {(props.isAdd) ? 'Save' : 'Update'}
                        </Button>
                        <Button
                            className="my-4"
                            color="secondary"
                            type="button"
                            onClick={handleReset}
                            disabled={props.loadingSubmitProduct}
                        >
                          <i className='fa fa-undo'></i> Reset
                        </Button>
                      </div>
                  </Form>
                )}
                </Formik>
              </CardBody>
          </Card>
          </div>
      </Modal>
    </>
  );
}

export default ModalProduct;

ModalProduct.propTypes = {
  toogleModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  loadingSubmitProduct: PropTypes.bool.isRequired,
  handleSubmitProduct: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isAdd: PropTypes.bool.isRequired,
  products: PropTypes.object
};