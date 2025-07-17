import styled from 'styled-components';
import { rem } from '../../styles/utils.ts';

export type DotsProps = {
  count: number;
};

export const Dots = ({ count }: DotsProps) => {
  return (
    <Wrapper>
      {[...Array(count)].map((_, index) => (
        <Dot key={index} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(32)};
`;

const Dot = styled.div`
  width: ${rem(24)};
  height: ${rem(24)};
  background-color: lightgray;
  border-radius: ${rem(24)};
`;
