import {
  Modal as SourceModal,
  ModalExtra,
  ModalProps,
} from '@lidofinance/lido-ui';
import { FC } from 'react';

export const Modal: FC<ModalProps> = (props) => {
  const { open = false, children, extra, ...rest } = props;

  return (
    <SourceModal
      open={open}
      extra={extra && <ModalExtra>{extra}</ModalExtra>}
      {...rest}
    >
      {children}
    </SourceModal>
  );
};
