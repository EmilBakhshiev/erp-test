import { Button, Card, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { CenteredContainer } from '../components/CenteredContainer';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import BtnForm from '../components/BtnForm';
import { STYLE_FORM, STYLE_HEADER_FORM } from '../utils/constants';
import { Link } from 'react-router-dom';
import { RoutesNames } from '../utils/routes';

import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../utils/schema';
import { IFormAuthValues } from '../types/auth';
import { postLogin } from '../redux/slices/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import AlertMessage from '../components/AlertMessage';
import { useAppSelector } from '../hooks/useAppSelector';

const Login: FC = () => {

  const dispatch = useAppDispatch();
  const { statusAuth } = useAppSelector((state) => state.authReducer);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormAuthValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleSubmitAuth: SubmitHandler<IFormAuthValues> = (data) => {

    dispatch(postLogin(data));
    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
    }, 2500);

  };

  return (
    <CenteredContainer>
      <Card
        sx={STYLE_FORM}
        component='form'
        onSubmit={handleSubmit(handleSubmitAuth)}
        noValidate
      >
        <Typography component='h2' sx={STYLE_HEADER_FORM}>
          Авторизация
        </Typography>
        <Controller
          name='username'
          control={control}
          rules={{
            required: 'Это обязательное поле',
          }}
          render={({ field }) => (
            <>
              <TextField
                {...field}
                type='text'
                fullWidth
                name='username'
                sx={{ marginBottom: '20px' }}
                label='имя пользователя'
              />

              {errors['username'] && (
                <Typography
                  sx={{
                    color: 'error.main',
                    marginTop: '-15px',
                    display: 'block',
                    mb: '20px',
                  }}
                  component='span'
                >
                  {errors['username'].message}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          name='password'
          control={control}
          rules={{
            required: 'Это обязательное поле',
          }}
          render={({ field }) => (
            <>
              <TextField
                {...field}
                sx={{ marginBottom: '30px' }}
                name='password'
                type={'password'}
                fullWidth
                label='пароль'
              />

              {errors['password'] && (
                <Typography
                  sx={{
                    color: 'error.main',
                    marginTop: '-15px',
                    display: 'block',
                    mb: '20px',
                  }}
                  component='span'
                >
                  {errors['password'].message}
                </Typography>
              )}
            </>
          )}
        />

        <Button fullWidth sx={{ mb: '10px' }}>
          <Link className='link' to={RoutesNames.REGISTER}>
            Нет аккаунта? Зарегистрироваться
          </Link>
        </Button>
        <BtnForm isDirty={isDirty} isValid={isValid} text='войти' />
      </Card>
      <AlertMessage isOpen={isOpen} status={statusAuth} />
    </CenteredContainer>
  );
};

export default Login;
