import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

test('displays a "Hello World" message', () => {
  render(<Card id={1} title={'title'} content={'content'} />);
  expect(screen.getByText('title')).toBeInTheDocument();
});

test('should return true', () => {
  expect(true).toBe(true);
});
