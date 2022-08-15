import { Button, Card, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { CenteredContainer } from './CenteredContainer';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import BtnForm from './BtnForm';
import {
  API_AUTH_ROUTE,
  JWT,
  STYLE_FORM,
  STYLE_HEADER_FORM,
} from '../utils/constants';
import { Link } from 'react-router-dom';
import { RoutesNames } from '../utils/routes';
import $api from '../api/api';
import { IFormAuthValues, UserResponse } from '../types/user';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../utils/schema';

const Login: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormAuthValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleSubmitAuth: SubmitHandler<IFormAuthValues> = async (data) => {
    const { username, password } = data;
    try {
      const res = await $api.post<UserResponse>(API_AUTH_ROUTE, {
        username,
        password,
      });
      const token = res.data.token;
      localStorage.setItem(JWT, token);
    } catch (error) {
      console.error(error);
    }
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
                /* error={errors['email']} */
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
                /*                 error={errors['password']}
                 */ fullWidth
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
    </CenteredContainer>
  );
};

export default Login;
