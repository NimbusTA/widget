import { FC } from 'react';

import { Section } from 'common/layout';

import {
  WhatIsNimbus,
  HowDoesNimbusWork,
  WhatIsLiquidStaking,
  WhatIsLiquidToken,
  WhatIsXcToken,
  HowSwapErc20,
  HowRateCalculated,
  WhichWalletSupport,
  LiquidOverTraditional,
  HowRedeemLiquidToken,
  WhatIsParachainToken,
  HowCalculateEarnings,
  WhatFee,
  RisksOfStakingWithNimbus,
  HowLongUnbondingPeriod,
  HowClaimAfterUnbonding,
} from './list';

export const StakeFaq: FC = () => (
  <Section title="FAQ">
    <WhatIsNimbus />
    <HowDoesNimbusWork />
    <WhatIsLiquidStaking />
    <WhatIsLiquidToken />
    <WhatIsXcToken />
    <HowSwapErc20 />
    <HowRateCalculated />
    <WhichWalletSupport />
    <LiquidOverTraditional />
    <HowRedeemLiquidToken />
    <WhatIsParachainToken />
    <HowCalculateEarnings />
    <RisksOfStakingWithNimbus />
    <WhatFee />
    <HowLongUnbondingPeriod />
    <HowClaimAfterUnbonding />
  </Section>
);
