import { MomentToolbar } from './MomentToolbar/MomentToolbar.tsx';
import styled from 'styled-components';
import { rem } from '../../styles/utils.ts';

export type MomentProps = {};

export const Moment = ({}: MomentProps) => {
  return (
    <Container>
      <ContainerInner>
        <Title>Moment by johndoe</Title>
        <Card>
          <MomentToolbar author={{ name: 'johndoe', imageUrl: '', url: '' }} />
        </Card>
      </ContainerInner>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  //height: 90vh;
  flex: 1;
`;

const ContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100dvh;
  gap: ${rem(16)};
  padding: ${rem(16)};
`;

const Title = styled.div`
  font-size: ${rem(22)};
  font-weight: 900;
  flex-shrink: 0;
`;

const Card = styled.div`
  width: min(100%, calc(100vh * 9 / 16 - 80px));
  height: min(100%, calc(100vw * 16 / 9));
  aspect-ratio: 9 / 16;
  border-radius: ${rem(12)};
  background-color: lightblue;
  filter: drop-shadow(rgba(0, 0, 0, 0.25) 2px 4px 6px);
`;
