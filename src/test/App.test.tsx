import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('Render main dev with class name "home"', () => {
  const { container } = render(<App />);
  expect(container.querySelector('div')!.className).toMatch('home');
});
