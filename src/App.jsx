import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import DashboardPage from './features/dashboard/DashboardPage';

function App() {
  return (
    <BrowserRouter>
    <CssBaseline>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path ="/dashboard" element={<DashboardPage />} />
      </Routes>
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;
