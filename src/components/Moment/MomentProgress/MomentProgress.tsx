import styled from 'styled-components';
import { forwardRef, useCallback, useEffect, useRef } from 'react';

export type MomentProgressRef = {
  updateProgress: (value: number, duration?: number) => void;
};

export const MomentProgress = forwardRef<MomentProgressRef>((_, ref) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const updateProgress = useCallback<MomentProgressRef['updateProgress']>(
    (value: number, duration?: number) => {
      if (progressRef.current) {
        // Add 0.5s worth of progress ahead
        const timeAhead = duration ? 0.5 / duration : 0;
        const adjustedProgress = Math.min(value + timeAhead, 1);

        progressRef.current.style.transition = 'width 0.5s linear';
        progressRef.current.style.width = `${adjustedProgress * 100}%`;
      }
    },
    []
  );

  useEffect(() => {
    if (typeof ref === 'object' && ref) {
      ref.current = { updateProgress };
    } else if (typeof ref === 'function') {
      ref({ updateProgress });
    }
  }, [ref, updateProgress]);

  return (
    <Container>
      <Progress ref={progressRef} />
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 3px;
  border-radius: 5px;
  background-color: #ffffff77;
  overflow: hidden;
`;

const Progress = styled.div`
  position: absolute;
  inset: 0;
  width: 0;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  transition: width 0.5s linear;
`;
