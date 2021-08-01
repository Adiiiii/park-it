import React, { useState, useEffect } from 'react';
import FullAddress from '../../components/Dashboard/Address/Address';
import Amenities from '../../components/Dashboard/Amenities/Amenities';
import {
  getGarageAmenities, getGarageAvailablity, getGarageInfo, getGaragePricing,
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
  AddressWrapper,
  // GarageImage,
  Label,
  DoorsWrapper, DoorImage, DoorList,
  ClickableText,
  Button,
  RefreshIcon,
} from './Dashboard.style';

const Dashboard = () => {
  const GARAGE_ID = 'f48da692-3092-45fc-94ed-44e45d8ed457';
  const [data, setData] = useState(null);
  const [door, setDoor] = useState();
  const [price, setPrice] = useState();

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
    const resp = await getGarageInfo(GARAGE_ID);
    const resp2 = await getGaragePricing(GARAGE_ID);
    const resp3 = await getGarageAmenities(GARAGE_ID);
    refreshAvailablity();
    setData({ ...resp.data, pricing: resp2.data, amenities: resp3.data });
  }, []);

  useEffect(() => {
    if (data) {
      selectDoor('Entry door');
    }
  }, [data]);

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
            {`${availablityInfo} out of ${data?.capacity} slots available`}
            <RefreshIcon onClick={refreshAvailablity} />
          </TotalSlots>
          <Rate>{`€${price}/hr`}</Rate>
        </HighLights>
      </Banner>
      <Details>
        <AddressWrapper>
          {/* <GarageImage src={getPicUrl('Interior')} style={{ display: 'none' }} /> */}
          <FullAddress
            city={data?.city}
            country={data?.country}
            postalCode={data?.postalCode}
            name={data?.name}
            streetAddress={data?.streetAddress}
          />
        </AddressWrapper>
        <Amenities {...data.amenities} />
        <DoorsWrapper>
          <Label>Doors information</Label>
          <DoorsInfo>
            <DoorList>
              <ClickableText selected={door?.description === 'Entry door'} onClick={() => selectDoor('Entry door')}>Entry Door</ClickableText>
              <ClickableText selected={door?.description === 'Exit door'} onClick={() => selectDoor('Exit door')}>Exit Door</ClickableText>
              <ClickableText selected={door?.description === 'Pedesterian door'} onClick={() => selectDoor('Pedesterian door')}>Pedesterain Doors</ClickableText>
            </DoorList>
            <DoorImage src={door?.url} />
          </DoorsInfo>
        </DoorsWrapper>
      </Details>
      <Button>Click to park</Button>
    </Wrapper>
  );
};

export default Dashboard;
