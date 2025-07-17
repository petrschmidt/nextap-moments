import styled from 'styled-components';
import { rem } from '../../styles/utils.ts';
import { Dots } from '../Dots/Dots.tsx';

export const Hero = () => (
  <Wrapper>
    <Title>Moments</Title>
    <Dots count={6} />
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Nunito Variable', sans-serif;
  font-weight: 900;
  font-size: ${rem(60)};
`;
