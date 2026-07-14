import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Badge } from '../Badge';

describe('Badge Component', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeDefined();
  });

  it('applies default variant classes', () => {
    const { container } = render(<Badge>Default</Badge>);
    expect((container.firstChild as HTMLElement).className).toContain('bg-bg-elevated');
  });

  it('applies success variant classes', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    expect((container.firstChild as HTMLElement).className).toContain('bg-success/20');
  });
});
