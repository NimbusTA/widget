import Image from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';

import { IIcon, IIcons } from 'components/placeholderIcon';

import BeamSwapLogo from 'assets/icons/beamswap.svg';
import BeefyLogo from 'assets/icons/beefy.svg';
import CurveLogo from 'assets/icons/curve.png';
import MidasLogo from 'assets/icons/midas.jpg';
import MoonwellLogo from 'assets/icons/moonwell.png';
import PickeFinanceLogo from 'assets/icons/picklefinance.svg';
import SolarbeamLogo from 'assets/icons/solarbeam.svg';
import StellaSwapLogo from 'assets/icons/stellaswap.svg';

import GLINTTokenIcon from 'assets/icons/token=GLINT.png';
import GLMRTokenIcon from 'assets/icons/token=GLMR.png';
import MAITokenIcon from 'assets/icons/token=MAI.png';
import MOVRTokenIcon from 'assets/icons/tokens=MOVR.svg';

import { XCDOT } from './XcDOT';
import { XCKSM } from './XcKSM';
/*
  Example usage of not circular icons
  A BgIcon with color should be added
  
  const ExampleSCG: FC<IIcon> = ({ shape }) => (
    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <BgIcon fillColor='#EF801C' shape={shape} />
      <path fillRule='evenodd' clipRule='evenodd' d='M8.20221 6.00596C8.2624 />
    </svg>
  );
 */
const StyledTokenImage = styled(Image).attrs({
  height: 24,
  width: 24,
})`
  border-radius: 50%;
`;

export const nDOT: FC<IIcon> = () => (
  <StyledTokenImage src={nDOTIcon} alt="nDOT token" />
);

export const nKSM: FC<IIcon> = () => (
  <StyledTokenImage src={nKSMIcon} alt="nKSM token" />
);

export const GLINT: FC<IIcon> = () => (
  <StyledTokenImage src={GLINTTokenIcon.src} alt="GLINT token" />
);

export const STELLA: FC<IIcon> = () => (
  <StyledTokenImage src={StellaSwapLogo} alt="STELLA token" />
);

export const GLMR: FC<IIcon> = () => (
  <StyledTokenImage src={GLMRTokenIcon.src} alt="GLMR token" />
);

export const MAI: FC<IIcon> = () => (
  <StyledTokenImage src={MAITokenIcon.src} alt="MAI token" />
);

export const MOVR: FC<IIcon> = () => (
  <StyledTokenImage src={MOVRTokenIcon} alt="MOVR token" />
);

const StyledImage = styled(Image).attrs({
  height: 32,
  width: 32,
})`
  border-radius: 50%;
`;

const MidasIcon: FC = () => (
  <StyledImage src={MidasLogo.src} alt="Midas Logo" />
);

const BeefyIcon: FC<IIcon> = () => (
  <StyledImage src={BeefyLogo} alt="Beefy logo" />
);

const CurveIcon: FC<IIcon> = () => (
  <StyledImage src={CurveLogo.src} alt="Curve logo" />
);

const MoonwellIcon: FC<IIcon> = () => (
  <StyledImage src={MoonwellLogo.src} alt="Moonwell logo" />
);

const StellaSwapIcon: FC<IIcon> = () => (
  <StyledImage src={StellaSwapLogo} alt="Stella Swap logo" />
);

const BeamSwapIcon: FC<IIcon> = () => (
  <StyledImage src={BeamSwapLogo} alt="Beam Swap logo" />
);

const SolarbeamIcon: FC<IIcon> = () => (
  <StyledImage src={SolarbeamLogo} alt="Solarbeam logo" />
);

const PickleFinanceIcon: FC<IIcon> = () => (
  <StyledImage src={PickeFinanceLogo} alt="Pickle Finance logo" />
);

export const projectIconsMap: IIcons = {
  // Polkadot
  Curve: CurveIcon,
  StellaSwap: StellaSwapIcon,
  BeamSwap: BeamSwapIcon,
  Midas: MidasIcon,

  // Kusama
  Solarbeam: SolarbeamIcon,
  PickleFinance: PickleFinanceIcon,

  // Both
  Beefy: BeefyIcon,
  Moonwell: MoonwellIcon,
};

export const tokenIconMap: IIcons = {
  // Polkadot
  xcDOT: XCDOT,
  nDOT: nDOT,
  GLINT: GLINT,
  STELLA: STELLA,
  GLMR: GLMR,
  WGLMR: GLMR,

  // Kusama
  xcKSM: XCKSM,
  nKSM: nKSM,
  SOLAR: SolarbeamIcon,
  MOVR: MOVR,
  WMOVR: MOVR,

  // Other
  MAI: MAI,
};

export const iconsMap: IIcons = {
  ...projectIconsMap,
  ...tokenIconMap,
};
