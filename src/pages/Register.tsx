import { Button, Card, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { CenteredContainer } from '../components/CenteredContainer';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { STYLE_FORM, STYLE_HEADER_FORM } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../utils/routes';
import schema from '../utils/schema';

import BtnForm from '../components/BtnForm';
import { IFormAuthValues } from '../types/auth';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { postRegister } from '../redux/slices/authSlice';
import AlertMessage from '../components/AlertMessage';
import { useAppSelector } from '../hooks/useAppSelector';

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { statusAuth } = useAppSelector((state) => state.authReducer);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormAuthValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleSubmitRegister: SubmitHandler<IFormAuthValues> = (data) => {
    dispatch(postRegister(data))
      .unwrap()
      .then(() => {
        setIsOpen(true);
        setTimeout(() => {
          navigate(RoutesNames.LOGIN);
          setIsOpen(false);
        }, 2000);
      })
      .catch(() => {
        setIsOpen(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      });
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
      <AlertMessage isOpen={isOpen} status={statusAuth} />
    </CenteredContainer>
  );
};

export default Register;
