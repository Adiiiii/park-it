import styled from 'styled-components';
import { FONT_SIZE, COLOR } from '../../../constants/style';
import { ReactComponent as Tick } from '../../../assets/images/icon-tick.svg';
import { ReactComponent as Cross } from '../../../assets/images/icon-cross.svg';

export const AmenitiesWrapper = styled.div`
min-width: 250px;
font-size: ${FONT_SIZE.large};
`;

export const Amenity = styled.div`
display: flex;
justify-content: space-between;
`;

export const TickIcon = styled(Tick)`
width: 20px;
height: 20px;
border-radius: 20px;
padding: 2px;

background: ${COLOR.yellow100};
`;
export const CrossIcon = styled(Cross)`
width: 20px;
height: 20px;
padding: 2px;
border-radius: 20px;
background: ${COLOR.yellow100};
`;

export const Name = styled.p`
color: ${COLOR.white};
line-height: 1.5;
margin-right: 8px;
`;

export const Value = styled.p`
color: ${COLOR.yellow100};
line-height: 1.5
`;
