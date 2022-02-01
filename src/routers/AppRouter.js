import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';
import AuthRouter from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import JournalScreen from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { firebase } from '../firebase/firebase-config';
import { startLoadingNotes } from '../actions/notes';

const AppRouter = () => {

  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {

      if(user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      };

      setChecking(false);
    });
    // Crea un observable, un tipo de objeto especial que se puede disparar más de una vez, como si la autenticación cambia, o si se logea el usuario
  }, [dispatch, setChecking, setIsLoggedIn]);

  if(checking) {
    return (
      <h1>Wait...</h1>
    );
  };

  return (
      <BrowserRouter>
        <Switch>
            <PublicRoute 
              path='/auth' 
              component={AuthRouter} 
              isAuthenticated={isLoggedIn}
            />
            <PrivateRoute 
              exact 
              path='/' 
              component={JournalScreen} 
              isAuthenticated={isLoggedIn}
            /> 

            <Redirect to="/auth/login" />
        </Switch>
      </BrowserRouter>
  );
};

export default AppRouter;
