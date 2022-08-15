import { Button, Card, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { CenteredContainer } from './CenteredContainer';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  API_REGISTER_ROUTE,
  STYLE_FORM,
  STYLE_HEADER_FORM,
} from '../utils/constants';
import { Link } from 'react-router-dom';
import { RoutesNames } from '../utils/routes';
import schema from '../utils/schema';
import $api from '../api/api';
import { IFormAuthValues } from '../types/user';
import BtnForm from './BtnForm';

const Register: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormAuthValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleSubmitRegister: SubmitHandler<IFormAuthValues> = async (data) => {
    const { username, password } = data;
    try {
      const res = await $api.post(API_REGISTER_ROUTE, {
        username,
        password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CenteredContainer>
      <Card
        sx={STYLE_FORM}
        component='form'
        onSubmit={handleSubmit(handleSubmitRegister)}
        noValidate
      >
        <Typography component='h2' sx={STYLE_HEADER_FORM}>
          Регистрация
        </Typography>
        <Controller
          name='username'
          control={control}
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
                sx={{ marginBottom: '20px' }}
                type='password'
                name='password'
                /*     error={errors['password']} */
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
          <Link className='link' to={RoutesNames.LOGIN}>
            Уже зарегистрированы? Войти
          </Link>
        </Button>
        <BtnForm
          isDirty={isDirty}
          isValid={isValid}
          text='Зарегистрироваться'
        />
      </Card>
    </CenteredContainer>
  );
};

export default Register;
