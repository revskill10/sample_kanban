import React from 'react';
import { Card } from 'react-bootstrap';
import type { KanbanCardProps } from './types';

const KanbanCard: React.FC<KanbanCardProps> = props => {
  return (
    <Card style={{ width: '18rem' }} draggable>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default KanbanCard;
