import React from 'react';
import Card from './Card';
import { KanbanCardProps } from './types';
export default {
  title: 'Card',
  component: Card
};
const props: KanbanCardProps = {
  id: 1,
  title: 'Test',
  content: 'Test 1'
};
export const Default = (): React.ReactNode => <Card {...props} />;
