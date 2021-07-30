import styled from 'styled-components';
import { COLOR, FONT_SIZE } from '../../constants/style';
import { ReactComponent as CarSvg } from '../../assets/images/me.svg';

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;

// https://images.unsplash.com/photo-1475459340673-25b00f9c9477
// https://images.unsplash.com/photo-1502352981868-f957ab3e10eb
// https://images.unsplash.com/photo-1464219789935-c2d9d9aba644
export const Banner = styled.div`
height: 400px;
width: 100%;
display:flex;
align-items: flex-end;
background: url('https://images.unsplash.com/photo-1464219789935-c2d9d9aba644');
background-image: linear-gradient(to right top, #b3b731, #bfc42d, #cbd127, #d7de1f, #e3eb12);
background-size: cover;
color: ${COLOR.black};
position: relative;
`;

export const HighLights = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
flex: 1;
padding: 0 40px 20px;
flex-wrap: wrap;
`;

export const GarageName = styled.h1`
display:flex;
max-width: 250px;
`;

export const TotalSlots = styled.h1`
display:flex;
`;

export const Rate = styled.h1`
display:flex;
`;

export const CarImage = styled(CarSvg)`
position: absolute;
top: -60px;
height: 400px;
`;

export const Details = styled.div`
display: flex;
padding: 20px 60px;
`;

export const AddressWrapper = styled.div`
max-width: 250px;
font-size: ${FONT_SIZE.large};
`;

export const Label = styled.p`
color: ${COLOR.yellow};
margin-bottom: 8px;
`;

export const Value = styled.p`
color: ${COLOR.white};
line-height: 1.5
`;
