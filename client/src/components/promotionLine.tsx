import React from 'react';
import { Box, Grid, GridItem, HStack } from '@chakra-ui/react';
import { RELEGATION_COLORS } from '../constants';
import { PromotionBox } from './promotionBox';

export const PromotionLine = () => {
  return (
    <Grid>
      <GridItem>
        <Box float='right'>
          <HStack spacing='0.5rem'>
            <PromotionBox color={RELEGATION_COLORS.RELEGATION}></PromotionBox>
            <p>Relegation</p>
            <PromotionBox
              color={RELEGATION_COLORS.POSSIBLE_RELEGATION}></PromotionBox>
            <p>Relegation play-off</p>
            <PromotionBox
              color={RELEGATION_COLORS.POSSIBLE_PROMOTION}></PromotionBox>
            <p>Promotion play-offs</p>
            <PromotionBox color={RELEGATION_COLORS.PROMOTION}></PromotionBox>
            <p>Promotion</p>
          </HStack>
        </Box>
      </GridItem>
    </Grid>
  );
};
