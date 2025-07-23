import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Loading } from './';

describe('Loading', () => {
  it('renderiza corretamente com o SVG', () => {
    const { container } = render(<Loading />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('aplica classes padrão corretamente', () => {
    const { container } = render(<Loading />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('flex', 'justify-center', 'items-center');
  });

  it('permite aplicar className customizado', () => {
    const { container } = render(<Loading className="bg-red-500" />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('bg-red-500');
  });
});
