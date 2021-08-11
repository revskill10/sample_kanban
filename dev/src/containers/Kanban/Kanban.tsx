/* eslint-disable prettier/prettier */
import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Modal, FormLabel } from 'react-bootstrap';
import KanbanCard from '~/components/Card/Card';
import type { KanbanProps } from './types';

const Layout: React.FC<KanbanProps> = props => {
  const [startColumn, setStartColumn] = React.useState();
  const [columns, setColumns] = React.useState(props.columns);
  const [dragItem, setDragItem] = React.useState<any>();
  const [currentSearch, setSearch] = React.useState('');
  const [show, setShow] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const onDragStart = draggedItem => () => {
    setStartColumn(draggedItem.column.type);
    setDragItem(draggedItem);
  };

  const onDragOver = column => () => {
    if (dragItem && column) {
      if (dragItem.column.type !== column) {
        setDragItem((prev: any) => ({
          column: column,
          item: prev.item
        }));
      }
    }
  };

  const onDragEnd = () => {
    if (dragItem.column === startColumn) return;
    const newCol = columns.findIndex(c => c.type === startColumn)
    columns[newCol].items = columns[newCol].items.filter(i => i.id !== dragItem.item.id);
    const oldCol = columns.findIndex(c => c.type === dragItem.column);
    columns[oldCol].items.push(dragItem.item);
    setColumns(columns);
    setDragItem(null);
    setStartColumn(null);
  }

  const onSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleClose = () => setShow(null);
  const handleShow = col => () => setShow(col);
  const handleSave =  () => {
    const col = columns.findIndex(c => c.type === show);
    columns[col].items.unshift({
      id: columns[col].items.length,
      title,
      content,
    })
    setColumns(columns);
    setShow(false);
  }
  const onChangeTitle = e => setTitle(e.target.value);

  const onChangeContent = e => setContent(e.target.value);

  React.useEffect(() => {
    if (currentSearch.length > 0) {
      const tmp = columns.map(c => {
        return {
          type: c.type,
          items: c.items.filter(i => i.title.includes(currentSearch) || i.content.includes(currentSearch))
        }
      });
      setColumns(tmp);
    } else {
      setColumns(props.columns);
    }
  }, [currentSearch, JSON.stringify(columns)])

  const kanbanNodes = columns.map(column => {
    const items = column.items.map((item, idx) => {
      return (
        <div
          key={`${item.id}-${idx}`}
          onDragStart={onDragStart({
            column,
            item
          })}
          onDragEnd={onDragEnd}
        >
          <KanbanCard {...item} />
        </div>
      );
    });

    return (
      <Col key={column.type} onDragOver={onDragOver(column.type)}>
        <Row style={{ marginBottom: '10px', width: '4rem' }}>
        <Button onClick={handleShow(column.type)}>New</Button>
        <Modal show={Boolean(show)} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new {column.type} item</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Container>
            <Row style={{ marginBottom: '10px' }}>
            <InputGroup>
            <FormLabel>Title</FormLabel>
            <FormControl
              aria-label="title"
              aria-describedby="inputGroup-sizing-default"
              value={title}
              onChange={onChangeTitle}
            />
          </InputGroup>
            </Row>
            <Row>
            <InputGroup>
            <FormLabel>Content</FormLabel>
            <FormControl
              aria-label="content"
              aria-describedby="inputGroup-sizing-default"
              value={content}
              onChange={onChangeContent}
            />
          </InputGroup>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Row>
        {items}
      </Col>
    );
  });
  return (
    <Container>
      <Row style={{ marginBottom: '10px' }}>
        <InputGroup>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={currentSearch}
            onChange={onSearch}
          />
        </InputGroup>
      </Row>
      <Row>{kanbanNodes}</Row>
    </Container>
  );
};

export default Layout;
