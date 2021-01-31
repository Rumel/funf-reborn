import React from 'react';
import { Spinner } from '@chakra-ui/react';

type Props = {
  size?: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | undefined;
};

export const FunfSpinner = ({ size = 'xl' }: Props) => {
  return <Spinner colorScheme='blackAlpha' size={size} />;
};
