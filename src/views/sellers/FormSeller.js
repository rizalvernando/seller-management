import { Provider } from 'react-redux';
import store from "../../store";
import {
  Container,
} from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader";
import FormComponent from "./form/FormComponent";
import TableProductComponent from './table/TableProductComponent';
import ModalProduct from './modal/ModalProduct';

const FormSeller = () => {  
  return (
    <>
      <Provider store={store}>
        <SimpleHeader />
        {/* Page content */}
        <Container className="mt--8" fluid>
          <div className='mb-4'>
            <FormComponent />
          </div>
          <div>
            <TableProductComponent/>
          </div>
        </Container>
      </Provider>
    </>
  );
};

export default FormSeller;
