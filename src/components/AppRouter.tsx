import { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
/* import { useAppSelector } from '../hooks/useAppSelector';
 */ import { privateRoutes, publicRoutes, RoutesNames } from '../utils/routes';

type AppRouterProps = {
  isAuth: boolean;
  setIsAuth?: (isAuth: boolean) => void;
};

const AppRouter: FC<AppRouterProps> = ({ isAuth,setIsAuth }) => {
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        );
      })}
      <Route
        path={RoutesNames.LOGIN}
        element={<Navigate replace to={RoutesNames.MAIN_PAGE} />}
      />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        );
      })}
      <Route
        path={RoutesNames.MAIN_PAGE}
        element={<Navigate replace to={RoutesNames.LOGIN} />}
      />
    </Routes>
  );
};

export default AppRouter;
