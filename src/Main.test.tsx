import { waitFor } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

vi.mock('./App', () => ({
  default: () => <div>Mock App</div>,
}));

vi.mock('react-toastify', () => ({
  ToastContainer: () => <div>Mock Toast</div>,
}));

describe('main.tsx', () => {
  beforeAll(async () => {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);

    await import('./main');
  });

  it('renderiza App e ToastContainer', async () => {
    const root = document.getElementById('root');

    await waitFor(() => {
      expect(root?.innerHTML).toContain('Mock App');
      expect(root?.innerHTML).toContain('Mock Toast');
    });
  });
});
