import {
  Modal,
  ModalProps,
  Copy,
  trimAddress,
  InlineLoader,
} from '@lidofinance/lido-ui';

import { BigNumber } from 'ethers';
import isUndefined from 'lodash/isUndefined';
import { FC, useCallback, useEffect, useMemo } from 'react';

import { useModal } from 'common/layout';
import {
  WalletModalContentStyle,
  WalletModalConnectedStyle,
  WalletModalConnectorStyle,
  WalletModalAccountStyle,
  WalletAccountInfoStyle,
  WalletModalTextStyle,
  WalletModalIconStyle,
  WalletAccountNameStyle,
} from 'common/wallets';

import { nativeToken, relayChainName } from 'config';
import { useXcTokenDecimals } from 'contracts';
import {
  useSubstrate,
  MODAL,
  useSubstrateBalances,
  WalletAccount,
} from 'features/transfer';
import { useCopyToClipboard } from 'hooks';
import { formatBalance } from 'utils';

import {
  SubstrateModalAccountStyle,
  SubstrateAccountButtonStyle,
  SubstrateAccountAddressStyle,
  SubstrateWalletCopyButton,
  SubstrateAccountItemStyle,
} from './styles';

import { AccountModalSubstrateProps } from './types';

const SubstrateWalletAccount: FC<AccountModalSubstrateProps> = (props) => {
  const { account, balance, loading, token } = props;
  const { selectedAccount, selectAccount } = useSubstrate();
  const active = account.address === selectedAccount?.address;

  const decimals = useXcTokenDecimals();
  const trimmedAddress = trimAddress(account.address ?? '', 8);
  const handleCopy = useCopyToClipboard(account.address ?? '');

  const { closeModal } = useModal(MODAL.account);
  const handleSelect = useCallback(() => {
    selectAccount(account);
    setTimeout(closeModal, 350);
  }, [account, closeModal, selectAccount]);

  const formattedBalance = useMemo(
    () =>
      !isUndefined(balance)
        ? `${formatBalance({
            balance: BigNumber.from(balance.toString()),
            decimals: decimals.data,
          })} ${token}`
        : '-',
    [balance, decimals.data, token],
  );

  return (
    <SubstrateAccountItemStyle>
      <SubstrateAccountButtonStyle
        disabled={active}
        size="xs"
        variant={active ? 'text' : 'ghost'}
        color={active ? 'primary' : 'secondary'}
        fullwidth
        onClick={handleSelect}
      >
        <SubstrateModalAccountStyle>
          <WalletModalAccountStyle>
            <WalletModalIconStyle address={account.address ?? ''} />
            <WalletAccountInfoStyle>
              <WalletAccountNameStyle>
                <WalletModalTextStyle>{account.name}</WalletModalTextStyle>
                <SubstrateAccountAddressStyle>
                  {trimmedAddress}
                </SubstrateAccountAddressStyle>
              </WalletAccountNameStyle>
              {loading ? <InlineLoader /> : formattedBalance}
            </WalletAccountInfoStyle>
          </WalletModalAccountStyle>
        </SubstrateModalAccountStyle>
      </SubstrateAccountButtonStyle>
      <SubstrateWalletCopyButton
        onClick={handleCopy}
        icon={<Copy />}
        size="xs"
        variant="ghost"
      />
    </SubstrateAccountItemStyle>
  );
};

const AccountModalSubstrate: FC<ModalProps> = (props) => {
  const { accounts, wallet } = useSubstrate();
  const { balances, loading } = useSubstrateBalances();

  const { closeModal } = useModal(MODAL.account);

  const mapAccounts = useMemo(() => {
    if (!accounts) return null;

    return accounts.map((account: WalletAccount) => (
      <SubstrateWalletAccount
        key={account.address}
        account={account}
        loading={loading}
        balance={balances && balances[account.address]}
        token={nativeToken}
      />
    ));
  }, [accounts, balances, loading]);

  useEffect(() => {
    if (!accounts || accounts.length === 0) {
      closeModal?.();
    }
  }, [accounts, closeModal]);

  return (
    <Modal title={`${relayChainName} Accounts`} {...props}>
      <WalletModalContentStyle>
        <WalletModalConnectedStyle>
          {accounts && wallet && (
            <WalletModalConnectorStyle>
              Connected with {wallet.title}
            </WalletModalConnectorStyle>
          )}
        </WalletModalConnectedStyle>
        {mapAccounts}
      </WalletModalContentStyle>
    </Modal>
  );
};

export default AccountModalSubstrate;
