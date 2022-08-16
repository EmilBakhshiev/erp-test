import { ComponentType } from "react";
import Login from "../pages/Login";
import MainPage from "../pages/MainPage";
import Register from "../pages/Register";


export interface IRoute {
    path: string;
    component: ComponentType;
  }

  export enum RoutesNames {
    MAIN_PAGE = '/',
    LOGIN = '/login',
    REGISTER = '/register',
  }

  export const publicRoutes: IRoute[] = [
    { path: RoutesNames.LOGIN, component: Login },
    { path: RoutesNames.REGISTER, component: Register },
  ];
  
  export const privateRoutes: IRoute[] = [
    { path: RoutesNames.MAIN_PAGE, component: MainPage },

  ];