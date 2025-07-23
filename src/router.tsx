import { Route, Routes } from 'react-router-dom';
import { QueryProvider } from './context/QueryContext';
import { TireProvider } from './context/TireContext';
import { HomePage } from './pages/Home';
import { TirePage } from './pages/tire';
import { TireDetailPage } from './pages/tireDetail';

const AppRoutes = () => {
  return (
    <QueryProvider>
      <TireProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/tire' element={<TirePage />} />
          <Route path='/tire/:id' element={<TireDetailPage />} />
        </Routes>
      </TireProvider>
    </QueryProvider>
  );
};
export default AppRoutes;
