import React from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';

type Props = {
  size?: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | undefined;
};

export const FunfSpinner = ({ size = 'xl' }: Props) => {
  return (
    <Box paddingTop='1rem' paddingBottom='1rem'>
      <Center>
        <Spinner size={size} />
      </Center>
    </Box>
  );
};
