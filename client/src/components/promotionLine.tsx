import React from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import { RELEGATION_COLORS } from '../constants';
import { PromotionBox } from './promotionBox';

const margin = '0rem 1rem';

export const PromotionLine = () => {
  return (
    <Flex flexDir='row' flexWrap='wrap' justify='flex-end'>
      <HStack margin={margin}>
        <PromotionBox color={RELEGATION_COLORS.RELEGATION}></PromotionBox>
        <p>Relegation</p>
      </HStack>
      <HStack margin={margin}>
        <PromotionBox
          color={RELEGATION_COLORS.POSSIBLE_RELEGATION}></PromotionBox>
        <p>Relegation play-off</p>
      </HStack>
      <HStack margin={margin}>
        <PromotionBox
          color={RELEGATION_COLORS.POSSIBLE_PROMOTION}></PromotionBox>
        <p>Promotion play-offs</p>
      </HStack>
      <HStack margin={margin}>
        <PromotionBox color={RELEGATION_COLORS.PROMOTION}></PromotionBox>
        <p>Promotion</p>
      </HStack>
    </Flex>
  );
};
