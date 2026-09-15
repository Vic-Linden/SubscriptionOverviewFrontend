import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';

function App() {
  return (
    <BrowserRouter>
    <CssBaseline>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;
