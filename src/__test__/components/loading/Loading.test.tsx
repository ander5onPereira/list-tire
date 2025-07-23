import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Loading } from '@components/loading';


describe('Loading', () => {
  it('renders correctly with the SVG', () => {
    const { container } = render(<Loading />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies default classes correctly', () => {
    const { container } = render(<Loading />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('flex', 'justify-center', 'items-center');
  });

  it('allows applying a custom className', () => {
    const { container } = render(<Loading className='bg-red-500' />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('bg-red-500');
  });
});
