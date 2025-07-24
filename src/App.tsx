import { useAxiosErrorHandler } from '@hooks/useAxiosErrorHandler';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './router';

function App() {
  useAxiosErrorHandler();
  return (
    <>
      <AppRoutes />
      <ToastContainer theme='colored' />
    </>
  );
}

export default App;
