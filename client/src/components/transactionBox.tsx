import React from 'react';
import { PlayerInfo } from '../types';

type Props = {
  inPlayer: PlayerInfo;
  outPlayer: PlayerInfo;
};

export const TransactionBox = ({ inPlayer, outPlayer }: Props) => {
  return (
    <p>
      {inPlayer.name} - {outPlayer.name}
    </p>
  );
};
