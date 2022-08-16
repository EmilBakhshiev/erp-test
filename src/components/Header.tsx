import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setIsAuth } from '../redux/slices/authSlice';
import { JWT } from '../utils/constants';
import { RoutesNames } from '../utils/routes';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(setIsAuth(false));
    localStorage.removeItem(JWT);
    navigate(RoutesNames.LOGIN);
  };

  return (
    <Box component={'header'}>
      <AppBar position='static'>
        <Toolbar
          sx={{
            display: 'flex',
            padding: '20px 70px',
            boxSizing: 'border-box',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            background: 'white',
          }}
        >
          <Button
            variant='outlined'
            sx={{
              p: '10px 30px',

              fontSize: '16px',
            }}
            onClick={handleLogOut}
          >
            выйти
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
