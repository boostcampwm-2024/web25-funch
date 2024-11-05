import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage component', () => {
  test('should render', () => {
    render(<HomePage />);

    const funch = screen.getByText(/funch/i);

    expect(funch).toBeDefined();
  });
});
