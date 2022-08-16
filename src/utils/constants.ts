import { SxProps } from '@mui/material';

export const API_URL = 'http://localhost:8080';

export const BOX_SHADOW_CARD: string = '0px 8px 24px 0px rgba(0, 0, 0, 0.15)';

export const STYLE_FORM: SxProps = {
  width: '500px',
  padding: '50px',
  borderRadius: '15px',
  boxSizing: 'border-box',
  boxShadow: BOX_SHADOW_CARD,
};

export const STYLE_HEADER_FORM: SxProps = {
  fontSize: '25px',
  mb: '35px',
  textAlign: 'center',
  pb: '20px',
  borderBottom: '1px solid lightgrey',
};

export const STYLE_USER_CARD: SxProps = {
  width: '350px',
  padding: '15px',
  borderRadius: '15px',
  boxSizing: 'border-box',
  boxShadow: BOX_SHADOW_CARD,
};

export const API_REGISTER_ROUTE: string = '/register/';
export const API_AUTH_ROUTE: string = '/login/';
export const API_ABOUT_ROUTE: string = '/about/';
export const JWT: string = 'jwt';
