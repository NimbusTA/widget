export const COMMON_ERRORS = {
  validPositiveNumber: 'Amount must be a valid positive number',
  zeroAmount: 'Amount must be greater than zero',
  hasAvailableBalance: 'Amount must not exceed available balance minus fees',
  hasAvailableFee: 'Insufficient funds for the transaction',
  lessThanMin: 'Too low amount to transfer',
  hasExistentialDeposit: 'Amount less than Existential Deposit, see FAQ',
};

export const EXISTENTIAL_DEPOSIT_WARNING =
  'Amount in Relay chain will be less than Existential Deposit. See FAQ for more details';
