import React, { useContext, useEffect, Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import authContext from '../context/auth/authContext';
import prefContext from '../context/pref/prefContext';

import classes from './style/MainContainer.module.css';

import Alerts from '../components/alerts/Alerts';
import Main from '../components/pages/Main';
import Navigation from '../components/navigation/Navigation'

function MainContainer() {
	const AuthContext = useContext(authContext);
	const PrefContext = useContext(prefContext);

	useEffect(() => {
		if (!AuthContext.isAuthenticated) {
			AuthContext.getUserList();
		};
		PrefContext.getTheme();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Fragment>
			<Alerts />
			<div className={ classes.navigation }>
				<Navigation />
			</div>
			<Routes>
				<Route exact path='/main' element={ <Main /> } />
				<Route exact path="*" element={<Navigate to="/main" />} />
			</Routes>
		</Fragment>
	);
}

export default MainContainer;
