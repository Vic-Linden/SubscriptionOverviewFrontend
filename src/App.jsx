import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import DashboardPage from './features/dashboard/DashboardPage';
import ProtectedRoutes from './routes/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <DashboardPage />
          </ProtectedRoutes>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
