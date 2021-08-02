import React from 'react';
import Timer from 'react-compound-timer';
import labels from '../../../constants/labels';
import { TimerComp, Heading } from './ParkingTimer.style';

const ParkingTimer = () => (
  <TimerComp>
    <Heading>{labels.PARKED_SINCE}</Heading>
    <Timer>
      <Timer.Hours />
      hours
      <Timer.Minutes />
      minutes
      <Timer.Seconds />
      seconds
    </Timer>
  </TimerComp>
);

export default ParkingTimer;
