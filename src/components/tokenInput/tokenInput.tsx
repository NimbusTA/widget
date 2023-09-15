import { InputLocked } from 'components/inputLocked';
import MaxButton from 'components/maxButton';

import { TokenInputStyle } from './tokenInputStyle';
import { TokenInputComponent } from './types';

const handleWheel: React.WheelEventHandler<HTMLInputElement> = (event) => {
  event.currentTarget.blur();
};

const TokenInput: TokenInputComponent = ({
  onMax,
  locked,
  disabled,
  fullwidth,
  children,
  ...rest
}) => (
  <TokenInputStyle
    autoFocus
    fullwidth
    placeholder="0"
    label="Amount"
    onWheel={handleWheel}
    rightDecorator={
      <>
        {locked && <InputLocked />}
        {onMax && (
          <MaxButton disabled={disabled} tabIndex={-1} onClick={onMax} />
        )}
      </>
    }
    disabled={disabled}
    {...rest}
  >
    {children}
  </TokenInputStyle>
);

export default TokenInput;
