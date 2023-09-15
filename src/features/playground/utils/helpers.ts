import fp from 'lodash/fp';

import { mapPlaygroundRowTypeToUi } from './mappers';
import { PlaygroundResponse } from './types';
import { PlaygroundData } from '../types';

export const getDataFromPlaygroundResponse = (
  frequency: string,
  amount: string,
  data: PlaygroundResponse,
): PlaygroundData =>
  fp.pipe(
    fp.get(`${amount};${frequency}`),
    fp.entries,
    fp.map(([key, value]) => [
      key,
      fp.pipe(fp.values, fp.map(mapPlaygroundRowTypeToUi))(value),
    ]),
    fp.fromPairs,
  )(data.data);
