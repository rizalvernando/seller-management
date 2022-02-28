import React from 'react';
import { Provider } from 'react-redux';
import store from "../../store";
// Reacstrap UI
import {
  Container,
} from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import TableComponent from './table/TableComponent';

const ListSellers = () => {

  return (
    <div>
      <Provider store={store}>
        <SimpleHeader />
        {/* Page content */}
        <Container className="mt--8" fluid>
          {/* Table */}
          <TableComponent />
        </Container>
      </Provider>
    </div>
  )
}

export default ListSellers;