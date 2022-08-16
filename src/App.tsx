import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import { useAppDispatch } from './hooks/useAppDispatch';
import { setIsAuth } from './redux/slices/authSlice';
import { JWT } from './utils/constants';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const checkToken = () => {
    const token = localStorage.getItem(JWT);
    if (token) {
      dispatch(setIsAuth(true));
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
      }}
    >
      <AppRouter />
    </Box>
  );
};

export default App;
