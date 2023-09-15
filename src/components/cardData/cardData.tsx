import { DataTableRow, InlineLoader } from '@lidofinance/lido-ui';

import { DataTableStyle, DataTableValueStyle } from './cardDataStyles';
import { CardDataRowComponent } from './types';

export const CardData = DataTableStyle;

export const CardDataRow: CardDataRowComponent = ({
  title,
  loading = false,
  value,
  highlight,
  ...rest
}) => (
  <DataTableRow title={title} highlight={highlight} {...rest}>
    <DataTableValueStyle highlight={highlight}>
      {loading ? <InlineLoader /> : value}
    </DataTableValueStyle>
  </DataTableRow>
);
