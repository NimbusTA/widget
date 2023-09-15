import React, { FC } from 'react';

import { WalletCardAccount } from 'common/wallets';

import { MODAL, useSubstrate, useSubstrateModal } from 'features/transfer';
import AccountBadgeSubstrate from 'features/transfer/components/addressBadgeSubstrate';

const AccountSubstrate: FC = (props) => {
  const { selectedAccount } = useSubstrate();

  const { openModal } = useSubstrateModal(MODAL.account);

  return (
    <WalletCardAccount>
      <AccountBadgeSubstrate
        onClick={openModal}
        color="accent"
        symbols={3}
        address={selectedAccount?.address ?? ''}
        name={selectedAccount?.name ?? ''}
        {...props}
      />
    </WalletCardAccount>
  );
};

export default React.memo(AccountSubstrate);
