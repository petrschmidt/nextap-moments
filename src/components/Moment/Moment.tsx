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
  height: 100%;
  gap: ${rem(18)};
  padding: ${rem(0, 16)};
  max-width: calc(90vh * 9 / 16);
  width: 90vmin;
`;

const Title = styled.div`
  margin-top: ${rem(24)};
  font-size: ${rem(22)};
  font-weight: 900;
  flex-shrink: 0;
`;

const Card = styled.div`
  width: 100%;
  max-height: 90vh;
  aspect-ratio: 9 / 16;
  border-radius: ${rem(12)};
  background-color: lightblue;
  filter: drop-shadow(rgba(0, 0, 0, 0.25) 2px 4px 6px);
`;
