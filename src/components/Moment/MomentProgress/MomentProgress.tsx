import styled from 'styled-components';

export type MomentProgressProps = {
  running: boolean;
  visible: boolean;
  durationMs: number;
};

export const MomentProgress = ({ running, visible, durationMs }: MomentProgressProps) => {
  return (
    <Container>
      <Progress $running={running} $visible={visible} $durationMs={durationMs} role="progressbar" />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 3px;
  border-radius: 5px;
  background-color: #ffffff77;
  overflow: hidden;
`;

const Progress = styled.div<{ $running: boolean; $visible: boolean; $durationMs: number }>`
  position: absolute;
  inset: 0;
  width: 0;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  animation-name: ${(p) => (p.$visible ? 'fill' : 'none')};
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
