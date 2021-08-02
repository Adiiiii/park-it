import React, { useState, useEffect } from 'react';
import FullAddress from '../../components/Dashboard/Address/Address';
import Amenities from '../../components/Dashboard/Amenities/Amenities';
import Bill from '../../components/Dashboard/Bill/Bill';
import ParkingTimer from '../../components/Dashboard/ParkingTimer/ParkingTimer';
import labels, { DOOR, PARKING_STATUS } from '../../constants/labels';
import {
  getGarageAmenities,
  getGarageAvailablity, getGarageInfo, getGaragePricing, startParking, stopParking,
} from '../../service/Dashboard.service';
import {
  Wrapper,
  Banner,
  TotalSlots,
  GarageName,
  DoorsInfo,
  Rate,
  HighLights,
  CarImage, Details,
  // GarageImage,
  Label,
  DoorsWrapper, DoorImage, DoorList,
  ClickableText,
  Button,
  RefreshIcon,
} from './Dashboard.style';

const Dashboard = () => {
  const GARAGE_ID = 'f48da692-3092-45fc-94ed-44e45d8ed457';
  const USER_ID = '1';
  const CAR_REGESTRATION_NUMBER = '1234';
  const [data, setData] = useState(null);
  const [door, setDoor] = useState();
  const [price, setPrice] = useState();
  const [bill, setBill] = useState();
  const [parkingStatus, setParkingStatus] = useState(PARKING_STATUS.NOT_PARKED);

  const [availablityInfo, setAvailablityInfo] = useState('NA');

  const getPicUrl = (description) => {
    const imgObj = data.photos
      .filter((photo) => photo.description === description)[0];
    const url = imgObj.urls.filter((urlObj) => urlObj.name === 'Small')[0].url || '';
    return url;
  };
  const selectDoor = (description) => setDoor({ description, url: getPicUrl(description) });

  const refreshAvailablity = async () => {
    const resp = await getGarageAvailablity(GARAGE_ID);
    setAvailablityInfo(resp.data.availableSpaces);
  };

  useEffect(async () => {
    // garage and pricing info
    try {
      const resp = await getGarageInfo(GARAGE_ID);
      const resp2 = await getGaragePricing(GARAGE_ID);
      const resp3 = await getGarageAmenities(GARAGE_ID);
      refreshAvailablity();
      setData({ ...resp.data, pricing: resp2.data, amenities: resp3.data });
    } catch (err) {
      alert(labels.SOMETHING_WENT_WRONG);
    }
  }, []);

  useEffect(() => {
    if (data) {
      selectDoor(DOOR.ENTRY);
    }
  }, [data]);

  const parkCarStart = async () => {
    try {
      await startParking({
        garageId: GARAGE_ID, userId: USER_ID, carRegistrationNumber: CAR_REGESTRATION_NUMBER,
      });

      setParkingStatus(PARKING_STATUS.PARKED);
    } catch (err) {
      alert(labels.SOMETHING_WENT_WRONG);
      console.log(err);
    }
  };

  const parkCarStop = async () => {
    try {
      const resp = await stopParking();
      setBill(resp.data.transactionAmount);
      setParkingStatus(PARKING_STATUS.BILL_GENERATED);
    } catch (err) {
      alert(labels.SOMETHING_WENT_WRONG);
      console.log(err);
    }
  };

  const parkCar = () => {
    switch (parkingStatus) {
      case PARKING_STATUS.NOT_PARKED:
        parkCarStart();
        break;

      case PARKING_STATUS.PARKED:
        parkCarStop();
        break;

      case PARKING_STATUS.BILL_GENERATED:
        setParkingStatus(PARKING_STATUS.NOT_PARKED);
        setBill(0);
        break;

      default:
        console.log('invalid case');
    }
  };

  const getParkingInfo = () => {
    switch (parkingStatus) {
      case PARKING_STATUS.NOT_PARKED:
        return `${availablityInfo} out of ${data?.capacity} slots available`;

      case PARKING_STATUS.PARKED:
        return labels.CAR_PARKED;

      case PARKING_STATUS.BILL_GENERATED:
        return labels.BILL_GENERATED;
      default:
        console.log('invalid case');
        return '';
    }
  };

  const getDetailsView = () => {
    switch (parkingStatus) {
      case PARKING_STATUS.NOT_PARKED:
        return (
          <>
            <FullAddress
              city={data?.city}
              country={data?.country}
              postalCode={data?.postalCode}
              name={data?.name}
              streetAddress={data?.streetAddress}
            />
            <Amenities {...data.amenities} />
            <DoorsWrapper>
              <Label>Doors information</Label>
              <DoorsInfo>
                <DoorList>
                  <ClickableText
                    selected={door?.description === DOOR.ENTRY}
                    onClick={() => selectDoor(DOOR.ENTRY)}
                  >
                    {DOOR.ENTRY}
                  </ClickableText>
                  <ClickableText
                    selected={door?.description === DOOR.EXIT}
                    onClick={() => selectDoor(DOOR.EXIT)}
                  >
                    {DOOR.EXIT}
                  </ClickableText>
                  <ClickableText
                    selected={door?.description === DOOR.PEDESTERIAN}
                    onClick={() => selectDoor(DOOR.PEDESTERIAN)}
                  >
                    {DOOR.PEDESTERIAN}
                  </ClickableText>
                </DoorList>
                <DoorImage src={door?.url} />
              </DoorsInfo>
            </DoorsWrapper>
          </>
        );

      case PARKING_STATUS.PARKED:
        return <ParkingTimer />;

      case PARKING_STATUS.BILL_GENERATED:
        return <Bill bill={bill} />;

      default:
        console.log('invalid case');
        return null;
    }
  };

  const primaryActionText = () => {
    switch (parkingStatus) {
      case PARKING_STATUS.NOT_PARKED:
        return labels.START_PARKING;

      case PARKING_STATUS.PARKED:
        return labels.START_PARKING;

      case PARKING_STATUS.BILL_GENERATED:
        return labels.BACK_TO_GARAGE;
      default:
        console.log('invalid case');
        return '';
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (data) {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const currentTime = `${hour}:${minute}:${second}`;

        const currentTimeObj = Date.parse(`01/01/2021 ${currentTime}`);
        const rushHourStartTimeObj = Date.parse(`01/01/2021 ${data.pricing['rush-hour'].rushHourStartTime}`);
        const rushHourEndTimeObj = Date.parse(`01/01/2021 ${data.pricing['rush-hour'].rushHourEndTime}`);

        if (currentTimeObj > rushHourStartTimeObj && currentTimeObj < rushHourEndTimeObj) {
          setPrice(data.pricing['rush-hour'].rushHourRate);
        } else {
          setPrice(data.pricing.standard.basePrice);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [data]);
  if (!data) return null;

  return (
    <Wrapper>
      <Banner>
        <CarImage />
        <HighLights>
          <GarageName>{data?.name}</GarageName>
          <TotalSlots>
            {getParkingInfo()}
            {parkingStatus === PARKING_STATUS.NOT_PARKED
              && <RefreshIcon onClick={refreshAvailablity} />}
          </TotalSlots>
          <Rate>{`€${price}/hr`}</Rate>
        </HighLights>
      </Banner>
      <Details>
        {getDetailsView()}
      </Details>
      <Button onClick={parkCar}>
        {primaryActionText()}
      </Button>
    </Wrapper>
  );
};

export default Dashboard;
