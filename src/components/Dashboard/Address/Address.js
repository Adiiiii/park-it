import React from 'react';
import PropTypes from 'prop-types';
import { Label, Value } from '../../../pages/dashboard/Dashboard.style';
import AddressWrapper from './Address.style';

const FullAddress = ({
  name, streetAddress, postalCode, city, country,
}) => (
  <>
    <AddressWrapper>
      <Label>Address</Label>
      <Value>{`${name}, `}</Value>
      <Value>{`${streetAddress}, `}</Value>
      <Value>{`${postalCode}, ${city}`}</Value>
      <Value>{country}</Value>
    </AddressWrapper>
  </>
);

FullAddress.propTypes = {
  name: PropTypes.string.isRequired,
  streetAddress: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default FullAddress;
