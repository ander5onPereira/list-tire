import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../../../components/card';


describe('Card component', () => {
  it('renders the children correctly', () => {
    render(<Card>Conteúdo do Card</Card>);
    expect(screen.getByText('Conteúdo do Card')).toBeInTheDocument();
  });

  it('applies the base class and the custom class passed via className', () => {
    const customClass = 'custom-class';
    const { container } = render(<Card className={customClass}>Teste</Card>);

    const div = container.firstChild as HTMLElement;

    expect(div).toHaveClass(
      'pt-10',
      'pb-20',
      'px-10',
      'bg-[#f6f7f8]',
      'rounded-2xl',
      'shadow-md',
      'border',
      'border-gray-100',
      'flex',
      'flex-col'
    );
    expect(div).toHaveClass(customClass);
  });

  it('passes additional attributes to the container', () => {
    const { container } = render(
      <Card id='card-id' data-testid='card-test'>
        Teste
      </Card>
    );

    const div = container.firstChild as HTMLElement;

    expect(div).toHaveAttribute('id', 'card-id');
    expect(div).toHaveAttribute('data-testid', 'card-test');
  });
});
