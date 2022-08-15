import { FC, useEffect, useState } from 'react';
import AppRouter from './components/AppRouter';
import { JWT } from './utils/constants';

const App: FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const checkToken = () => {
    const token = localStorage.getItem(JWT);
    if (token) {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div>
      <AppRouter isAuth={isAuth} />
    </div>
  );
};

export default App;
