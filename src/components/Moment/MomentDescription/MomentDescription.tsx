import styled from 'styled-components';
import { EyeIcon, MapPinIcon } from '@phosphor-icons/react';

export type MomentDescriptionProps = {
  location?: {
    name: string;
    url: string;
  };
  description?: string;
  views?: number;
};

export const MomentDescription = ({ location, description, views }: MomentDescriptionProps) => {
  return (
    <Container>
      {location && (
        <Location href={location.url}>
          <MapPinIcon size={30} weight="fill" />
          {location.name}
        </Location>
      )}
      {description !== undefined && <Description>{description}</Description>}
      {views !== undefined && (
        <ViewsContainer>
          <EyeIcon size={30} weight="fill" />
          {views}
        </ViewsContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.md};
  max-width: 80%;
  z-index: 30;
`;

const Location = styled.a`
  display: flex;
  align-items: center;
  max-width: fit-content;
  padding: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.fontSizes.xxl};
  gap: ${({ theme }) => theme.space.sm};
  background-color: rgba(255, 255, 255, 0.25);
  color: ${({ theme }) => theme.colors.foreground.primary};
`;

const Description = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground.primary};
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const ViewsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground.primary};
`;
