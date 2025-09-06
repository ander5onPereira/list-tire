import { useAxiosErrorHandler } from '@hooks/useAxiosErrorHandler';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './router';

function App() {
  useAxiosErrorHandler();
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
