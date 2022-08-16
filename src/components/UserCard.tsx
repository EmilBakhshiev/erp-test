import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { getUserInfo } from '../redux/slices/userSlice';
import { STYLE_USER_CARD } from '../utils/constants';
import { CenteredContainer } from './CenteredContainer';

const UserCard = () => {
  const { id, avatar, username, about } = useAppSelector(
    (state) => state.userReducer.user
  );
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  

  return (
    <CenteredContainer>
      <Card key={id} sx={STYLE_USER_CARD}>
        <CardMedia
          sx={{ borderRadius: '5px' }}
          component='img'
          height='150'
          image={avatar}
          alt={username}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {username}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {about}
          </Typography>
        </CardContent>
      </Card>
    </CenteredContainer>
  );
};

export default UserCard;
