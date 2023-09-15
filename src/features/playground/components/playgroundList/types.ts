import { PlaygroundData } from '../../types';

export interface PlaygroundListProps {
  error?: Error | null;
  onRefresh: () => void;

  data: PlaygroundData[];
  pending: boolean;
}
