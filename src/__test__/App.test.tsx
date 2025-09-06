import { render } from '@testing-library/react';
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';

describe('App', () => {
  it('deve renderizar sem quebrar', () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });
});
