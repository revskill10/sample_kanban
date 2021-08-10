import React from 'react';
import Kanban from './Kanban';
import type { KanbanProps } from './types';

export default {
  title: 'Kanban',
  component: Kanban
};
const demoItems: KanbanProps = {
  columns: [
    {
      type: 'Todo',
      items: [
        {
          id: 1,
          title: 'todo 1',
          content: 'todo 1'
        },
        {
          id: 2,
          title: 'todo 2',
          content: 'todo 2'
        }
      ]
    },
    {
      type: 'Done',
      items: [
        {
          id: 3,
          title: 'done 1',
          content: 'done 1'
        },
        {
          id: 4,
          title: 'done 2',
          content: 'done 2'
        }
      ]
    }
  ]
};
export const Default = (): React.ReactNode => <Kanban {...demoItems} />;
