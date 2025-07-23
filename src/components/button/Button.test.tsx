import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '.';


describe('Button component', () => {
  it('renderiza o texto filho corretamente', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('aplica a classe base por padrão', () => {
    render(<Button>Base Mode</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-primary-light');
  });

  it('aplica a classe outline quando mode="outline"', () => {
    render(<Button mode="outline">Outline Mode</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('border-normal-bluee');
  });

  it('aplica a classe text quando mode="text"', () => {
    render(<Button mode="text">Text Mode</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('text-primary-light');
  });

  it('aplica className adicional passada via props', () => {
    render(<Button className="custom-class">With Extra Class</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('custom-class');
  });

  it('passa prop type para o botão', () => {
    render(<Button type="submit">Submit</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('type', 'submit');
  });

  it('desabilita o botão com disabled prop', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('dispara evento onClick quando clicado', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
