// Simple toast notification system for the app
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

let toastId = 0;
let listeners: ((toast: Toast) => void)[] = [];

export function showToast(
  message: string,
  type: ToastType = 'info',
  duration = 3000
) {
  const id = `toast-${++toastId}`;
  const toast: Toast = { id, message, type, duration };
  listeners.forEach((listener) => listener(toast));

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
}

export function removeToast(id: string) {
  // Toast removal will be handled by the ToastContainer component
}

export function onToastChange(listener: (toast: Toast) => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
