import { KanbanCardProps } from '~/components/Card/types';

interface KanbanColumn {
  type: string;
  items: KanbanCardProps[];
}
export interface KanbanProps {
  columns: KanbanColumn[];
}
