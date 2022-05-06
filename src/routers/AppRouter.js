import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { JournalScreen } from '../comonents/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase-config';
import  { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes, startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));
            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);
    

    if (checking) {
        return (
            <h1>Please Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes
                        path={'/auth'}
                        isAuthenticated={isLoggedIn}
                        component={AuthRouter}
                    />
                    <PrivateRoutes
                        path={'/'}
                        isAuthenticated={isLoggedIn}
                        component={JournalScreen}
                        exact
                    />
                    <Redirect
                        to={'/auth/login'}
                    />
                </Switch>
            </div>
        </Router>
    )
}
