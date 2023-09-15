import React, { FC } from 'react';

const WarningIconComponent: FC = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" />
    <path d="M16,24a2,2,0,1,1,2-2A2,2,0,0,1,16,24Zm0-2Z" />
    <path d="M16,18a1,1,0,0,1-1-1V8a1,1,0,0,1,2,0v9A1,1,0,0,1,16,18Z" />
  </svg>
);

export const WarningIcon = React.memo(WarningIconComponent);
