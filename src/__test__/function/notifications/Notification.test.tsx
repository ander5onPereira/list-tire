import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as Toastify from 'react-toastify';
import {
  toastError,
  toastInfo,
  toastSuccess,
  toastWarning,
} from '@function/notifications';

describe('Toast functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should call toast.success with content and options.', () => {
    const mockSuccess = vi
      .spyOn(Toastify.toast, 'success')
      .mockReturnValue('success');
    const content = 'Success message';
    const options = { autoClose: 3000 };

    const result = toastSuccess({ content, options });

    expect(mockSuccess).toHaveBeenCalledWith(content, options);
    expect(result).toBe('success');
  });

  it('Should call toast.warning with content and options.', () => {
    const mockWarning = vi
      .spyOn(Toastify.toast, 'warning')
      .mockReturnValue('warning');
    const content = 'Warning message';
    const options = { position: 'top-right' };

    const result = toastWarning({ content, options });

    expect(mockWarning).toHaveBeenCalledWith(content, options);
    expect(result).toBe('warning');
  });

  it('Should call toast.info with content and options.', () => {
    const mockInfo = vi.spyOn(Toastify.toast, 'info').mockReturnValue('info');
    const content = 'Info message';
    const options = { pauseOnHover: true };

    const result = toastInfo({ content, options });

    expect(mockInfo).toHaveBeenCalledWith(content, options);
    expect(result).toBe('info');
  });

  it('Should call toast.error with content and options.', () => {
    const mockError = vi
      .spyOn(Toastify.toast, 'error')
      .mockReturnValue('error');
    const content = 'Error message';
    const options = { hideProgressBar: true };

    const result = toastError({ content, options });

    expect(mockError).toHaveBeenCalledWith(content, options);
    expect(result).toBe('error');
  });

  it('Should work without options.', () => {
    const content = 'Simple message';

    expect(toastSuccess({ content })).toBeDefined();
    expect(toastWarning({ content })).toBeDefined();
    expect(toastInfo({ content })).toBeDefined();
    expect(toastError({ content })).toBeDefined();
  });
});
