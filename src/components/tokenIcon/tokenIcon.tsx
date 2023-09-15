import Image from 'next/image';

import { TokenIconComponent } from './types';

export const TokenIcon: TokenIconComponent = ({ icon, alt = '' }) => (
  <Image src={icon} alt={alt} width={24} height={24} />
);
