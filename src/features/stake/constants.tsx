import { liquidToken, xcToken } from '../../config';

export const APR_TOOLTIP_TEXT = (
  <>
    APR is denominated in terms of {liquidToken}, not USD, and is not a
    guaranteed or promised return or profit. With Nimbus, you receive staking
    rewards within 24 hours of your deposit being made, without waiting for
    validator activation. APR is calculated per month using rewards for the last
    30 days.
  </>
);

export const REWARDS_HELPER_TEXT =
  'Please note: this fee applies to staking rewards/earnings only, and is NOT taken from your staked amount.';

export const RECEIVE_STAKE_TOOLTIP = `During the exchanging of ${xcToken} to ${liquidToken} small losses may occur as a result of rounding`;
