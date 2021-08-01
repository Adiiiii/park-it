import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '../../../pages/dashboard/Dashboard.style';
import {
  AmenitiesWrapper, Amenity, CrossIcon, Name, TickIcon, Value,
} from './Amenities.style';

const Amenities = ({
  isIndoor,
  isOutdoor,
  wheelChairAccessible,
  evCharging,
  manned,
  maximumHeadSpaceInMeters,
  widthRestrictionInMeters,
}) => (
  <AmenitiesWrapper>
    <Label>Amenities</Label>
    <Amenity>
      <Name>Indoor parking</Name>
      {isIndoor ? <TickIcon /> : <CrossIcon />}
    </Amenity>
    <Amenity>
      <Name>Outdoor parking</Name>
      {isOutdoor ? <TickIcon /> : <CrossIcon />}
    </Amenity>
    <Amenity>
      <Name>Wheel chair accessible</Name>
      {wheelChairAccessible ? <TickIcon /> : <CrossIcon />}
    </Amenity>
    <Amenity>
      <Name>EV charging</Name>
      {evCharging ? <TickIcon /> : <CrossIcon />}
    </Amenity>
    <Amenity>
      <Name>Person to assist</Name>
      {manned ? <TickIcon /> : <CrossIcon />}
    </Amenity>

    <Amenity>
      <Name>Entrance Headspace</Name>
      <Value>
        {`${maximumHeadSpaceInMeters}m`}
      </Value>
    </Amenity>
    <Amenity>
      <Name>Entrance width</Name>
      <Value>
        {`${widthRestrictionInMeters}m`}
      </Value>
    </Amenity>

  </AmenitiesWrapper>
);

Amenities.propTypes = {
  isIndoor: PropTypes.bool.isRequired,
  isOutdoor: PropTypes.bool.isRequired,
  wheelChairAccessible: PropTypes.bool.isRequired,
  manned: PropTypes.bool.isRequired,
  evCharging: PropTypes.bool.isRequired,
  widthRestrictionInMeters: PropTypes.string.isRequired,
  maximumHeadSpaceInMeters: PropTypes.string.isRequired,
};

export default Amenities;
