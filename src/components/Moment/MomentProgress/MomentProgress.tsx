import styled from 'styled-components';
import { rem } from '../../../styles';

export type MomentProgressProps = {
  running: boolean;
  visibleInViewport: boolean;
  durationMs: number;
};

const BORDER_RADIUS = rem(5);

export const MomentProgress = ({ running, visibleInViewport, durationMs }: MomentProgressProps) => {
  return (
    <Container>
      <Progress
        $running={running}
        $visibleInViewport={visibleInViewport}
        $durationMs={durationMs}
        role="progressbar"
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 3px;
  border-radius: ${BORDER_RADIUS};
  background-color: #ffffff77;
  overflow: hidden;
`;

const Progress = styled.div<{
  $running: boolean;
  $visibleInViewport: boolean;
  $durationMs: number;
}>`
  position: absolute;
  inset: 0;
  width: 0;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.foreground.primary};
  border-radius: ${BORDER_RADIUS};
  animation-name: ${(p) => (p.$visibleInViewport ? 'fill' : 'none')};
  animation-duration: ${(p) => p.$durationMs}ms;
  animation-timing-function: linear;
  animation-play-state: ${(p) => (p.$running ? 'running' : 'paused')};
  animation-iteration-count: infinite;

  @keyframes fill {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;
