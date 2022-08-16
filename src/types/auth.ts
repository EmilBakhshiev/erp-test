import { Status } from "./StatusEnum";

export interface IAuthResponse {
  token: string;
  error: string;
}

export interface IRegisterResponse {
  message: string;
}

export interface IFormAuthValues {
    username: string;
    password: string;
    message: string
  }

export interface IAuthState{
  isAuth: boolean,
  statusAuth: Status
  message: string
}