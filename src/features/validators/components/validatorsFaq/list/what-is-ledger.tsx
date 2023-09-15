import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { explorerUrl, parachainName } from 'config';

export const WhatIsLedger: FC = () => {
  return (
    <Accordion summary="What are nominated validators in the current era?">
      <p>
        We call a ledger an address of a nominator in our system which gets part
        of the distributed pooled stake. We introduced ledgers to increase
        rewards for users, while mitigating the slashing risk.
      </p>
      <p>
        Links in the <strong>&apos;Ledger Address&apos;</strong> column are
        {parachainName} network addresses because Nimbus protocol is operating
        in the {parachainName} blockchain. You may follow the link to see more
        details on{' '}
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href={explorerUrl}
        >
          {parachainName} Chain block explorer
        </a>
        .
      </p>
    </Accordion>
  );
};
