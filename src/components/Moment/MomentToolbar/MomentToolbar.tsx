import type { FC } from 'react';
import type { Icon } from '@phosphor-icons/react';
import styled from 'styled-components';

type ActionableIconButtonProps = {
  icon: FC<Icon>;
  count?: number;
  onClick?: () => void;
};

export type MomentToolbarProps = {
  author: {
    name: string;
    imageUrl: string;
    url: string;
  };
  actions?: ActionableIconButtonProps[];
};

export const MomentToolbar = ({ author }: MomentToolbarProps) => {
  return (
    <>
      <AuthorContainer>
        <AuthorName>{author.name}</AuthorName>
      </AuthorContainer>
    </>
  );
};

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorName = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
