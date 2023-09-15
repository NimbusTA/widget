import { Stake, Validators, Referral } from '@lidofinance/lido-ui';

export const headerLinks = [
  { title: 'Stake', href: '/', icon: <Stake /> },
  {
    title: 'Validators',
    href: '/validators',
    icon: <Validators />,
    prefetch: false,
  },
  { title: 'DeFi', href: '/defi', icon: <Referral />, prefetch: false },
];
