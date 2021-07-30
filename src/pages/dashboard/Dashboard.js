import React, { useState, useEffect } from 'react';
import FullAddress from '../../components/Dashboard/Address/Address';
import { getGarageInfo, getGaragePricing } from '../../service/Dashboard.service';
import {
  Wrapper,
  Banner,
  TotalSlots,
  GarageName, Rate, HighLights, CarImage, Details, AddressWrapper,
} from './Dashboard.style';

const Dashboard = () => {
  const GARAGE_ID = 'f48da692-3092-45fc-94ed-44e45d8ed457';
  const [data, setData] = useState(null);
  const [price, setPrice] = useState();

  useEffect(async () => {
    // garage and pricing info
    const resp = await getGarageInfo(GARAGE_ID);
    const resp2 = await getGaragePricing(GARAGE_ID);
    setData({ ...resp.data, pricing: resp2.data });
  }, []);

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

  return (
    <Wrapper>
      <Banner>
        <HighLights>
          <CarImage />
          <GarageName>{data?.name}</GarageName>
          <TotalSlots>
            {`${data?.capacity} slots`}
          </TotalSlots>
          <Rate>{`€${price}/hr`}</Rate>
        </HighLights>
      </Banner>
      <Details>
        <AddressWrapper>
          <FullAddress
            city={data?.city}
            country={data?.country}
            postalCode={data?.postalCode}
            name={data?.name}
            streetAddress={data?.streetAddress}
          />
        </AddressWrapper>
      </Details>
    </Wrapper>
  );
};

export default Dashboard;
