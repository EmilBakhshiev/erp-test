import { Alert, Fade } from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Status } from '../types/StatusEnum';

type AlertProps = {
  isOpen: boolean;
  status: Status;
};

const AlertMessage: FC<AlertProps> = ({ isOpen, status }) => {
  const { message } = useAppSelector((state) => state.authReducer);

  return (
    <Fade in={isOpen}>
      <Alert
        severity={status === Status.SUCCESS ? Status.SUCCESS : Status.ERROR}
        sx={{
          mb: 2,
          fontSize: '18px',
          position: 'fixed',
          bottom: 20,
          left: 0,
        }}
      >
        {message}
      </Alert>
    </Fade>
  );
};

export default AlertMessage;
