import styled from 'styled-components';
import { COLOR, FONT_SIZE } from '../../constants/style';
import { ReactComponent as CarSvg } from '../../assets/images/me.svg';
import { ReactComponent as RefreshSvg } from '../../assets/images/icon-refresh.svg';

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
`;

// https://images.unsplash.com/photo-1475459340673-25b00f9c9477
// https://images.unsplash.com/photo-1502352981868-f957ab3e10eb
// https://images.unsplash.com/photo-1464219789935-c2d9d9aba644
export const Banner = styled.div`
height: 400px;
overflow: hidden;
width: 100%;
flex-direction: column;
display:flex;
background-image: linear-gradient(to right top, #e9a80b, #e7b604, #e3c306, #ded111, #d7de1f);
background-size: cover;
color: ${COLOR.black};
position: relative;
justify-content: center;
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
align-items: center;
`;

export const Rate = styled.h1`
display:flex;
`;

export const CarImage = styled(CarSvg)`
transform: scale(1.2);
`;

export const Details = styled.div`
display: flex;
justify-content: space-evenly;
padding: 50px 60px 0 60px;
flex-wrap: wrap;
`;

export const Label = styled.p`
color: ${COLOR.yellow};
margin-bottom: 16px;
`;

export const Value = styled.p`
color: ${COLOR.white};
line-height: 1.5
`;

export const DoorsInfo = styled.div`
padding-bottom: 24px;
display: flex;
font-size: ${FONT_SIZE.large};
margin-right: 24px;
`;

export const DoorsWrapper = styled.div`
font-size: ${FONT_SIZE.large}
`;

export const DoorImage = styled.img`
flex: 1;
width: 100%;
`;

export const DoorList = styled.div`
display: flex;
width: 100%;
flex-direction: column;
justify-content: space-between;
margin-right: 20px;
`;

export const ClickableText = styled.p`
cursor: pointer;
transition: all 0.2s ease;
color: ${({ selected }) => (selected ? COLOR.yellow100 : COLOR.white)};
:hover {
    color: ${COLOR.yellow100};
}
`;

export const Button = styled.button`
padding: 20px 30px;
margin: 20px 30px 0 0;
align-self: flex-end;
cursor: pointer;
font-size: ${FONT_SIZE.large};
background: ${COLOR.yellow};
color: ${COLOR.white};
transition: all 0.2s ease;
background-image: linear-gradient(to right top, #e9a80b, #e7b604, #e3c306, #ded111, #d7de1f);
border-radius: 15px;
:hover {
    background: ${COLOR.white};
    color: ${COLOR.yellow};
}
`;

export const RefreshIcon = styled(RefreshSvg)`
cursor: pointer;
width: 20px;
height: 24px;
margin-left: 8px;
:hover *{
    fill: ${COLOR.white};
    }
`;
