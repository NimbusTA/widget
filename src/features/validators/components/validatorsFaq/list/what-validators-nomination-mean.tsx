import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { relayChainName } from 'config';

export const WhatValidatorsNominationMean: FC = () => {
  return (
    <Accordion summary="What do validators in nomination mean?">
      <p>
        We have a dynamic nomination model and the validators list is being
        reviewed every seven days.{' '}
        <strong>&apos;Validators in Nomination&apos;</strong> column shows{' '}
        {relayChainName} validators addresses that had our nominations in the
        current nomination period.
      </p>
    </Accordion>
  );
};
