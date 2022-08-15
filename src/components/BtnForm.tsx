import { Button } from '@mui/material';
import { FC } from 'react';

interface IButtonProps {
  text: string;
  isDirty: boolean;
  isValid: boolean;
}

const BtnForm: FC<IButtonProps> = ({ text, isDirty, isValid }) => {
  return (
    <Button
      type='submit'
      size='large'
      sx={{ p: '15px' }}
      fullWidth
      variant='contained'
      disabled={!isDirty || !isValid}
    >
      {text}
    </Button>
  );
};

export default BtnForm;
