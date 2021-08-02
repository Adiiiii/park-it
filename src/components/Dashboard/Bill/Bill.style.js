import styled from 'styled-components';
import { FONT_SIZE, COLOR } from '../../../constants/style';

export const BillWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: ${COLOR.white};
font-size: ${FONT_SIZE.max};
`;

export const Heading = styled.p`
    color: ${COLOR.yellow100};
    font-size: ${FONT_SIZE};
`;
