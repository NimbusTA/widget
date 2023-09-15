import { FC } from 'react';

import { Section } from 'common/layout';

import {
  WhatAreNominatedValidators,
  WhatIsActiveStake,
  WhatIsLedger,
  WhatIsNominator,
  WhatIsValidator,
  WhatValidatorsNominationMean,
} from './list';

export const ValidatorsFaq: FC = () => (
  <Section title="FAQ">
    <WhatIsValidator />
    <WhatIsNominator />
    <WhatIsLedger />
    <WhatIsActiveStake />
    <WhatValidatorsNominationMean />
    <WhatAreNominatedValidators />
  </Section>
);
