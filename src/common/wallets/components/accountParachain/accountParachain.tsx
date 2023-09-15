import { useSDK } from '@lido-sdk/react';
import React, { FC } from 'react';

import { useModal } from 'common/layout';
import { MODAL } from 'providers';

import { AddressBadgeParachain } from '../addressBadgeParachain';
import { WalletCardAccount } from '../walletCard';

export const AccountParachain: FC = (props) => {
  const { account } = useSDK();
  const { openModal } = useModal(MODAL.account);

  return (
    <WalletCardAccount {...props}>
      <AddressBadgeParachain
        onClick={openModal}
        color="accent"
        address={account}
      />
    </WalletCardAccount>
  );
};
