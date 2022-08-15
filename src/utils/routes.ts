import { ComponentType } from "react";
import Login from "../components/Login";
import MainPage from "../components/MainPage";
import Register from "../components/Register";


export interface IRoute {
    path: string;
    component: ComponentType;
  }

  export enum RoutesNames {
    MAIN_PAGE = '/',
    LOGIN = '/login',
    REGISTER = '/register',
    NOT_FOUND = '*',
  }

  export const publicRoutes: IRoute[] = [
    { path: RoutesNames.LOGIN, component: Login },
    /* { path: RoutesNames.NOT_FOUND, component: NotFound }, */
    { path: RoutesNames.REGISTER, component: Register },
  ];
  
  export const privateRoutes: IRoute[] = [
    { path: RoutesNames.MAIN_PAGE, component: MainPage },

  ];