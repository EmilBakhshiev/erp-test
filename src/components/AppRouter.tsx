import { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { privateRoutes, publicRoutes, RoutesNames } from '../utils/routes';



const AppRouter: FC = () => {
  const { isAuth } = useAppSelector(
    (state) => state.authReducer
  );
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
