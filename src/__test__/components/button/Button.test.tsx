import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../../components/button';


describe('Button component', () => {
  it('should render the child text correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies the base class by default', () => {
    render(<Button>Base Mode</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-primary-light');
  });

  it('applies the outline class when mode="outline"', () => {
    render(<Button mode='outline'>Outline Mode</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('border-normal-bluee');
  });

  it('applies the text class when mode="text"', () => {
    render(<Button mode='text'>Text Mode</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('text-primary-light');
  });

  it('applies additional className passed via props', () => {
    render(<Button className='custom-class'>With Extra Class</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('custom-class');
  });

  it('passes the type prop to the button', () => {
    render(<Button type='submit'>Submit</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('type', 'submit');
  });

  it('disables the button with the disabled prop', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('fires the onClick event when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
