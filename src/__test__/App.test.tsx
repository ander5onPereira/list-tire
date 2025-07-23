import { render } from '@testing-library/react';
import App from '../App';


describe('App', () => {
  it('deve renderizar sem quebrar', () => {
    render(<App />);
  });
});
