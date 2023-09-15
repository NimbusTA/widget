import { ButtonIcon, LockSmall } from '@lidofinance/lido-ui';
import React, { FC, PropsWithChildren } from 'react';

type ApproveButtonProps = PropsWithChildren & {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
};

export const ApproveButton: FC<ApproveButtonProps> = ({
  loading,
  disabled,
  onClick,
  children,
}) => {
  return (
    <ButtonIcon
      fullwidth
      icon={<LockSmall />}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonIcon>
  );
};
