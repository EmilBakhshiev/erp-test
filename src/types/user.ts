import { Status } from "./StatusEnum";



export interface IUserState {
  user: IUserInfo;
  status: Status;
}

export interface IUserInfo {
  id: number;
  username: string;
  avatar: string;
  about: string | null;
}

export interface IUserInfoResponse {
    data: IUserInfo
  }
