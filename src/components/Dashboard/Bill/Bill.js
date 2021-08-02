import React from 'react';
import PropTypes from 'prop-types';
import labels from '../../../constants/labels';
import { BillWrapper, Heading } from './Bill.style';

const Bill = ({ bill }) => (
  <BillWrapper>
    <Heading>{labels.TOTAL_BILL}</Heading>
    {`€${bill}`}
  </BillWrapper>
);

Bill.propTypes = {
  bill: PropTypes.string.isRequired,
};

export default Bill;
