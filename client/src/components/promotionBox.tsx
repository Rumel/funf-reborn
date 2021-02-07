import { Box } from '@chakra-ui/react';
import React from 'react';

type Props = {
  color: string;
};

export const PromotionBox = ({ color }: Props) => {
  return <Box bg={color} w='1rem' h='0.75rem' borderRadius='30%'></Box>;
};
