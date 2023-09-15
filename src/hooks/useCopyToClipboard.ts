import { ToastInfo } from '@lidofinance/lido-ui';
import copy from 'copy-to-clipboard';
import { useCallback } from 'react';

export const useCopyToClipboard = (text: string): (() => void) => {
  return useCallback(() => {
    copy(text);
    ToastInfo('Copied to clipboard');
  }, [text]);
};
