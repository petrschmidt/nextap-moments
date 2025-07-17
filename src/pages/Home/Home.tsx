import styled from 'styled-components';
import { Hero } from '../../components/Hero/Hero.tsx';
import { Moment } from '../../components/Moment/Moment.tsx';

export default function Home() {
  return (
    <>
      {/*<Hero />*/}
      <MomentWrapper>
        <Moment />
      </MomentWrapper>
    </>
  );
}

const MomentWrapper = styled.div`
  position: relative;
`;
